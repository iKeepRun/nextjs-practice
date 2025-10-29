import {NextRequest, NextResponse} from "next/server";
import dbConnect from "@/lib/mongodb";
import Event from "@/database/event.model";
import {v2 as cloudinary} from 'cloudinary';


export async function POST(req: NextRequest):Promise<NextResponse> {
    try {

        await dbConnect();

        const formData = await req.formData();

        // Type-safe event object built from FormData
        const event: Record<string, FormDataEntryValue | FormDataEntryValue[]> = {};

        // const event:{[key:string]:FormDataEntryValue | FormDataEntryValue[]}={}

        try {
            // 遍历所有表单条目
            for (const [key, value] of formData.entries()) {
                // 如果键已经存在，转换为数组
                if (event[key]) {
                    // 如果还不是数组，先转换为数组
                    if (!Array.isArray(event[key])) {
                        event[key] = [event[key] as FormDataEntryValue];
                    }
                    (event[key] as FormDataEntryValue[]).push(value);
                } else {
                    event[key] = value;
                }
            }

        } catch (e) {
            console.error(e)
            return NextResponse.json({status: 400, message: 'Invalid json data format'})
        }

        const file = formData.get('image') as File;
        if (!file) return NextResponse.json({status: 400, message: 'Image is required'})

        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const uploadResult = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream({
                    folder: 'events',
                    resource_type: 'image',
                }, (error, result) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(result);
                    }
                }
            ).end( buffer)
        });

        event.image = (uploadResult as{ secure_url:string}).secure_url;
        console.log("传参：",event)
        const createdEvent = await Event.create(event);

        return NextResponse.json({status: 200, message: 'Event created successfully', event: createdEvent})

    } catch (e) {
        console.error(e)
        return NextResponse.json({
            error: e instanceof Error ? e.message : 'unknow',
            status: 500,
            message: 'Event creation failed'
        })
    }


}

export async function GET():Promise<NextResponse> {
    try {
        await dbConnect();
        const events = await Event.find();
        return NextResponse.json({status: 200, message: 'Events fetched successfully', events})
    } catch (e) {
        console.error(e)
        return NextResponse.json({
            error: e instanceof Error ? e.message : 'unknow',
            status: 500,
            message: 'Events fetching failed'
        })
    }
}