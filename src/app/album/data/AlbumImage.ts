/**
 * @author Attila Barna
 */
import {Image} from './image';

/**
 * @author Attila Barna
 */
export interface AlbumImage extends  Image {
  albumId: number;
  authors: Array<number>;
  creationTime: Date;
}
