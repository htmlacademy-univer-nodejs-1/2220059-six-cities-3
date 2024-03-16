import { FileReader } from './file-reader.interface.js';
import { readFileSync } from 'node:fs';
import { RentOffer, HouseingType, Convenience, UserType } from '../../types/index.js';

export class TSVFileReader implements FileReader {
  private rawData = '';

  constructor(
    private readonly filename: string
  ) {}

  public read(): void {
    this.rawData = readFileSync(this.filename, { encoding: 'utf-8' });
  }

  public toArray(): RentOffer[] {
    if (!this.rawData) {
      throw new Error('File was not read');
    }

    const offers: RentOffer[] = [];


    for (const row of this.rawData.split('\n')) {
      if (row.trim().length === 0) {
        continue;
      }
      const [
        title,
        description,
        publicationDate,
        city,
        preview,
        photos,
        isPremium,
        isFavourites,
        rank,
        housingType,
        roomsCount,
        guestsCount,
        price,
        conveniences,
        name,
        email,
        avatarPath,
        password,
        type,
        commentsCount,
        coordinates] = row.split('\t');
      const offer: RentOffer = {
        title,
        description,
        publicationDate: new Date(publicationDate),
        city,
        preview,
        photos: photos.split(';'),
        isPremium: Boolean(isPremium),
        isFavourites: Boolean(isFavourites),
        rank: Number.parseFloat(rank),
        housingType: HouseingType[housingType as keyof typeof HouseingType],
        roomsCount: Number.parseInt(roomsCount, 10),
        guestsCount: Number.parseInt(guestsCount, 10),
        price: Number.parseFloat(price),
        conveniences: conveniences.split(';')
          .map((convenience) => Convenience[convenience as keyof typeof Convenience]),
        creator: {name, email, avatarPath, password, type: UserType[type as 'Usual' | 'Pro']},
        commentsCount: Number.parseInt(commentsCount, 10),
        coordinates: [Number.parseFloat(coordinates.split('; ')[0]),
          Number.parseFloat(coordinates.split('; ')[1])]
      };
      offers.push(offer);
    }

    return offers;
  }
}
