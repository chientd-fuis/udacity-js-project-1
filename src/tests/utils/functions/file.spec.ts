import path from 'path';
import { getImagePath, resize } from '../../../utils/functions/file';
import { ImageInformation } from '../../../utils/interfaces/FileInformation';
import sizeOf from 'image-size';

describe('utils/funtions - file.ts', () => {
  it('getImagePath - should return exactly path when input file name', () => {
    const image = { filename: 'test', height: 0, width: 0 } as ImageInformation;
    expect(getImagePath(image)).toEqual(
      path.resolve(__dirname, '../../../../assets/images/full/test.jpg'),
    );
  });

  it('resize - should return exactly path when input file name', async () => {
    const imageInfo = {
      filename: 'icelandwaterfall',
      height: 50,
      width: 50,
    } as ImageInformation;
    const image = await resize(imageInfo);
    expect(sizeOf(image).height).toEqual(50);
    expect(sizeOf(image).width).toEqual(50);
    expect(sizeOf(image).type).toEqual('jpg');
  });

  it('resize - should return error when filename is not found', () => {
    const imageInfo = {
      filename: 'test',
      height: 50,
      width: 50,
    } as ImageInformation;
    resize(imageInfo).catch((err) => {
      expect(err).toEqual('file not found!!');
    });
  });

  it('resize - should return error when filename is not found', () => {
    const imageInfo = {
      filename: 'icelandwaterfall',
      height: NaN,
      width: 50,
    } as ImageInformation;
    resize(imageInfo).catch((err) => {
      expect(err).not.toBeNull();
    });
  });
});
