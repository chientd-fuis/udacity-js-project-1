import { validateImage } from '../../../utils/functions/validations';
import { ImageInformationRequest } from '../../../utils/interfaces/FileInformation';

describe('utils/funtions - validation.ts', (): void => {
  it('should return null when all parameters is correctly', async (): Promise<void> => {
    const image = {
      filename: 'santamonica',
      height: '100',
      width: '100',
    } as ImageInformationRequest;
    const error = await validateImage(image);
    expect(error).toBeNull();
  });

  it('should return error when filename is missing', async (): Promise<void> => {
    const image = { height: '100', width: '100' } as ImageInformationRequest;
    const error = await validateImage(image);
    expect(error?.code).toEqual(400);
    expect(error?.message).toEqual('filename is missing!!!');
  });

  it('should return error when width is missing', async (): Promise<void> => {
    const image = {
      filename: 'santamonica',
      height: '100',
    } as ImageInformationRequest;
    const error = await validateImage(image);
    expect(error?.code).toEqual(400);
    expect(error?.message).toEqual('width is missing!!!');
  });

  it('should return error when height is missing', async (): Promise<void> => {
    const image = {
      filename: 'santamonica',
      width: '100',
    } as ImageInformationRequest;
    const error = await validateImage(image);
    expect(error?.code).toEqual(400);
    expect(error?.message).toEqual('height is missing!!!');
  });

  it('should return 404 error when filename is not exists', async (): Promise<void> => {
    const image = {
      filename: 'test',
      height: '100',
      width: '100',
    } as ImageInformationRequest;
    const error = await validateImage(image);
    expect(error?.code).toEqual(404);
    expect(error?.message).toEqual('filename is not exist!!!');
  });

  it('should return error when height is not a number', async (): Promise<void> => {
    const image = {
      filename: 'santamonica',
      height: 'test',
      width: '100',
    } as ImageInformationRequest;
    const error = await validateImage(image);
    expect(error?.code).toEqual(400);
    expect(error?.message).toEqual('height is invalid!!!');
  });

  it('should return error when width is not a number', async (): Promise<void> => {
    const image = {
      filename: 'santamonica',
      height: '100',
      width: 'test',
    } as ImageInformationRequest;
    const error = await validateImage(image);
    expect(error?.code).toEqual(400);
    expect(error?.message).toEqual('width is invalid!!!');
  });
});
