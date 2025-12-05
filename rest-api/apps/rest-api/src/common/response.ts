export class StandarResponse<T> {
  constructor(
    public data: T,
    public message = 'Success',
    public code = 200,
    public error = false,
  ) {}
}
