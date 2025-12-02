export interface FileMessageDto {
    originalname: string;
    mimetype: string;
    size: number;
    buffer: string; // base64 encoded
}
