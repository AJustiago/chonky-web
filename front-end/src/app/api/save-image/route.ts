import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(req: NextRequest) {
    const { base64String, fileName } = await req.json();
    const base64Data = base64String.replace(/^data:image\/\w+;base64,/, "");
    const buffer = Buffer.from(base64Data, 'base64');

    const savePath = path.join('D:/Alex/Github/chonky-web/front-end/public/products', fileName);
    const dir = path.dirname(savePath);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(savePath, buffer);

    return NextResponse.json({ path: `/products/${fileName}` });
}