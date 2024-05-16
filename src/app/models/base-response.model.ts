export class BaseResponse<T> {
    success!: boolean;
    data: T | undefined;
    error?: string;
}