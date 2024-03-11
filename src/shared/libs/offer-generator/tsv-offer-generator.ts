import dayjs from 'dayjs';
import { OfferGenerator } from './offer-generator.interface.js';
import { MockServerData, UserType, HouseingType, Convenience } from '../../types/index.js';
import { generateRandomValue, getRandomItem, getRandomItems } from '../../helpers/index.js';

const MIN_RANK = 0.0;
const MAX_RANK = 5.0;

const MIN_ROOMS_COUNT = 1;
const MAX_ROOMS_COUNT = 8;

const MIN_GUESTS_COUNT = 1;
const MAX_GUESTS_COUNT = 10;

const MIN_PRICE = 100;
const MAX_PRICE = 100000;

const MIN_COMMENTS_COUNT = 0;
const MAX_COMMENTS_COUNT = 1000;

const FIRST_WEEK_DAY = 1;
const LAST_WEEK_DAY = 7;

export class TSVOfferGenerator implements OfferGenerator {
  constructor(private readonly mockData: MockServerData) {}

  public generate(): string {
    const title = getRandomItem<string>(this.mockData.titles);
    const description = getRandomItem<string>(this.mockData.descriptions);
    const [city, coordinates] = getRandomItem<string>(this.mockData.cities).split(' ');
    const preview = getRandomItem<string>(this.mockData.previews);
    const photos = getRandomItem<string>(this.mockData.photos);
    const isPremium = getRandomItem([0, 1]);
    const isFavourites = getRandomItem([0, 1]);
    const rank = generateRandomValue(MIN_RANK, MAX_RANK).toFixed(1);
    const housingType = getRandomItem(Object.values(HouseingType));
    const roomsCount = generateRandomValue(MIN_ROOMS_COUNT, MAX_ROOMS_COUNT).toString();
    const guestsCount = generateRandomValue(MIN_GUESTS_COUNT, MAX_GUESTS_COUNT).toString();
    const price = generateRandomValue(MIN_PRICE, MAX_PRICE).toString();
    const conveniences = getRandomItems(Object.values(Convenience)).join(';');
    const name = getRandomItem(this.mockData.names);
    const email = getRandomItem(this.mockData.emails);
    const avatar = getRandomItem(this.mockData.avatarPaths);
    const password = getRandomItem<string>(this.mockData.passwords);
    const type = getRandomItem([UserType.Usual, UserType.Pro]);
    const commentsCount = generateRandomValue(MIN_COMMENTS_COUNT, MAX_COMMENTS_COUNT).toString();

    const createdDate = dayjs()
      .subtract(generateRandomValue(FIRST_WEEK_DAY, LAST_WEEK_DAY), 'day')
      .toISOString();

    return [
      title, description, createdDate, city, preview,
      photos, isPremium, isFavourites, rank, housingType,
      roomsCount, guestsCount, price, conveniences, name,
      email, avatar, password, type, commentsCount, coordinates
    ].join('\t');
  }
}
