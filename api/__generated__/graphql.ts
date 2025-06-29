import * as Apollo from '@apollo/client';
import {gql} from '@apollo/client';

export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
  File: { input: any; output: any; }
  ObjectID: { input: any; output: any; }
};

export type ActivityAddPathPointInput = {
  activityId: Scalars['ObjectID']['input'];
  lat: Scalars['String']['input'];
  lon: Scalars['String']['input'];
};

export type ActivityAddScoreInput = {
  activityId: Scalars['ObjectID']['input'];
  points: Scalars['Float']['input'];
};

export type ActivityAddTrashInput = {
  activityId: Scalars['ObjectID']['input'];
  lat: Scalars['String']['input'];
  lon: Scalars['String']['input'];
};

export type ActivityCreateInput = {
  activityType: ActivityType;
  description: Scalars['String']['input'];
  distance?: Scalars['Float']['input'];
  durationTime?: Scalars['Float']['input'];
  imageUrls?: Array<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  path?: Array<PathPointInput>;
  points?: Scalars['Float']['input'];
  trashLocations?: Array<PathPointInput>;
  userId: Scalars['ObjectID']['input'];
};

export type ActivityEndInput = {
  activityId: Scalars['ObjectID']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  distance: Scalars['Float']['input'];
  imageUrls: Array<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type ActivityFindManyInput = {
  activityType?: InputMaybe<ActivityType>;
  description?: InputMaybe<Scalars['String']['input']>;
  maxDistance?: InputMaybe<Scalars['Float']['input']>;
  maxDurationTime?: InputMaybe<Scalars['Float']['input']>;
  maxPoints?: InputMaybe<Scalars['Float']['input']>;
  maxTrashCount?: InputMaybe<Scalars['Float']['input']>;
  minDistance?: InputMaybe<Scalars['Float']['input']>;
  minDurationTime?: InputMaybe<Scalars['Float']['input']>;
  minPoints?: InputMaybe<Scalars['Float']['input']>;
  minTrashCount?: InputMaybe<Scalars['Float']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type ActivityFindManySortInput = {
  activityType?: InputMaybe<SortInput>;
  createdAt?: InputMaybe<SortInput>;
  distance?: InputMaybe<SortInput>;
  durationTime?: InputMaybe<SortInput>;
  name?: InputMaybe<SortInput>;
  points?: InputMaybe<SortInput>;
  trashCount?: InputMaybe<SortInput>;
  updatedAt?: InputMaybe<SortInput>;
};

export type ActivityInput = {
  id: Scalars['ObjectID']['input'];
};

export type ActivityObject = {
  __typename?: 'ActivityObject';
  activityType: ActivityType;
  createdAt: Scalars['DateTime']['output'];
  currentDuration?: Maybe<Scalars['Float']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  distance: Scalars['Float']['output'];
  durationTime: Scalars['Float']['output'];
  endTime?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ObjectID']['output'];
  imageUrls: Array<Scalars['String']['output']>;
  isActive: Scalars['Boolean']['output'];
  name?: Maybe<Scalars['String']['output']>;
  path: Array<PathPointObject>;
  points: Scalars['Float']['output'];
  startTime?: Maybe<Scalars['DateTime']['output']>;
  trashCount: Scalars['Float']['output'];
  trashLocations: Array<PathPointObject>;
  updatedAt: Scalars['DateTime']['output'];
  user?: Maybe<UserObject>;
  userId: Scalars['ObjectID']['output'];
};

export type ActivityPaginationResponse = {
  __typename?: 'ActivityPaginationResponse';
  data: Array<ActivityObject>;
  metadata: PaginationMetadata;
};

export type ActivityStartInput = {
  activityType: ActivityType;
  userId: Scalars['ObjectID']['input'];
};

export enum ActivityType {
  Biking = 'BIKING',
  Other = 'OTHER',
  Running = 'RUNNING',
  Trekking = 'TREKKING',
  Walking = 'WALKING'
}

export type ActivityUpdateInput = {
  activityType?: InputMaybe<ActivityType>;
  description?: InputMaybe<Scalars['String']['input']>;
  distance?: InputMaybe<Scalars['Float']['input']>;
  durationTime?: InputMaybe<Scalars['Float']['input']>;
  id: Scalars['ObjectID']['input'];
  imageUrls?: InputMaybe<Array<Scalars['String']['input']>>;
  name?: InputMaybe<Scalars['String']['input']>;
  path?: InputMaybe<Array<PathPointUpdateInput>>;
  points?: InputMaybe<Scalars['Float']['input']>;
  trashCount?: InputMaybe<Scalars['Float']['input']>;
};

export type AwardCreateInput = {
  iconUrl: Scalars['String']['input'];
};

export type AwardFindManyInput = {
  iconUrl?: InputMaybe<Scalars['String']['input']>;
};

export type AwardFindManySortInput = {
  createdAt?: InputMaybe<SortInput>;
  iconUrl?: InputMaybe<SortInput>;
  updatedAt?: InputMaybe<SortInput>;
};

export type AwardInput = {
  id: Scalars['ObjectID']['input'];
};

export type AwardObject = {
  __typename?: 'AwardObject';
  coin: Scalars['Float']['output'];
  createdAt: Scalars['DateTime']['output'];
  iconUrl: Scalars['String']['output'];
  id: Scalars['ObjectID']['output'];
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type AwardPaginationResponse = {
  __typename?: 'AwardPaginationResponse';
  data: Array<AwardObject>;
  metadata: PaginationMetadata;
};

export type AwardUpdateInput = {
  iconUrl?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ObjectID']['input'];
};

export type ChallengeCreateInput = {
  description: Scalars['String']['input'];
  iconUrl: Scalars['String']['input'];
  points: Scalars['Float']['input'];
  topic: Scalars['String']['input'];
  type: ChallengeType;
};

export type ChallengeFindManyInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  points?: InputMaybe<Scalars['Float']['input']>;
  topic?: InputMaybe<Scalars['String']['input']>;
};

export type ChallengeFindManySortInput = {
  createdAt?: InputMaybe<SortInput>;
  description?: InputMaybe<SortInput>;
  points?: InputMaybe<SortInput>;
  topic?: InputMaybe<SortInput>;
  updatedAt?: InputMaybe<SortInput>;
};

export type ChallengeInput = {
  id: Scalars['ObjectID']['input'];
};

export type ChallengeObject = {
  __typename?: 'ChallengeObject';
  coin: Scalars['Float']['output'];
  createdAt: Scalars['DateTime']['output'];
  description: Scalars['String']['output'];
  iconUrl: Scalars['String']['output'];
  id: Scalars['ObjectID']['output'];
  points: Scalars['Float']['output'];
  topic: Scalars['String']['output'];
  type: ChallengeType;
  updatedAt: Scalars['DateTime']['output'];
};

export type ChallengePaginationResponse = {
  __typename?: 'ChallengePaginationResponse';
  data: Array<ChallengeObject>;
  metadata: PaginationMetadata;
};

export type ChallengeProgressFindInput = {
  challengeId?: InputMaybe<Scalars['ObjectID']['input']>;
  userId?: InputMaybe<Scalars['ObjectID']['input']>;
};

export type ChallengeStartInput = {
  challengeId: Scalars['ObjectID']['input'];
  userId: Scalars['ObjectID']['input'];
};

export enum ChallengeType {
  Company = 'COMPANY',
  Own = 'OWN'
}

export type ChallengeUpdateInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  iconUrl?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ObjectID']['input'];
  points?: InputMaybe<Scalars['Float']['input']>;
  topic?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<ChallengeType>;
};

export type ChallengeUpdateProgressInput = {
  challengeId: Scalars['ObjectID']['input'];
  /** Progress percentage from 0 to 100 */
  progress: Scalars['Int']['input'];
  userId: Scalars['ObjectID']['input'];
};

export enum Error {
  ActivityAlreadyStarted = 'ACTIVITY_ALREADY_STARTED',
  ActivityNotActive = 'ACTIVITY_NOT_ACTIVE',
  ActivityNotFound = 'ACTIVITY_NOT_FOUND',
  ExampleNameNotUniqueCode = 'EXAMPLE_NAME_NOT_UNIQUE_CODE',
  ExampleNotFoundCode = 'EXAMPLE_NOT_FOUND_CODE',
  MarketplaceInsufficientCoins = 'MARKETPLACE_INSUFFICIENT_COINS',
  MarketplaceNotFound = 'MARKETPLACE_NOT_FOUND',
  UnauthenticatedErrorCode = 'UNAUTHENTICATED_ERROR_CODE'
}

export type EventCreateInput = {
  eventType: EventType;
  imageUrl?: Scalars['String']['input'];
  link?: InputMaybe<Scalars['String']['input']>;
  localization: LocalizationInput;
  name: Scalars['String']['input'];
  time: Scalars['String']['input'];
  userIds: Array<Scalars['String']['input']>;
};

export type EventFindManyInput = {
  date?: InputMaybe<Scalars['DateTime']['input']>;
  eventType?: InputMaybe<Array<EventType>>;
  localization?: InputMaybe<LocalizationInput>;
  name?: InputMaybe<Scalars['String']['input']>;
  place?: InputMaybe<Scalars['String']['input']>;
  time?: InputMaybe<Scalars['DateTime']['input']>;
  userIds?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type EventFindManySortInput = {
  createdAt?: InputMaybe<SortInput>;
  date?: InputMaybe<SortInput>;
  eventType?: InputMaybe<SortInput>;
  name?: InputMaybe<SortInput>;
  time?: InputMaybe<SortInput>;
  updatedAt?: InputMaybe<SortInput>;
};

export type EventInput = {
  eventType: EventType;
  id: Scalars['ObjectID']['input'];
  imageIcon: Scalars['String']['input'];
  localization: LocalizationInput;
  name: Scalars['String']['input'];
  time: Scalars['String']['input'];
  userIds: Array<Scalars['String']['input']>;
};

export type EventObject = {
  __typename?: 'EventObject';
  createdAt: Scalars['DateTime']['output'];
  date: Scalars['DateTime']['output'];
  eventType: EventType;
  id: Scalars['ObjectID']['output'];
  imageUrl: Scalars['String']['output'];
  link?: Maybe<Scalars['String']['output']>;
  localization: Array<Scalars['Float']['output']>;
  name: Scalars['String']['output'];
  place: Scalars['String']['output'];
  time: Scalars['DateTime']['output'];
  updatedAt: Scalars['DateTime']['output'];
  userIds: Array<Scalars['String']['output']>;
};

export type EventPaginationResponse = {
  __typename?: 'EventPaginationResponse';
  data: Array<EventObject>;
  metadata: PaginationMetadata;
};

export enum EventType {
  Ecological = 'ECOLOGICAL',
  Social = 'SOCIAL'
}

export type EventUpdateInput = {
  eventType?: InputMaybe<EventType>;
  id: Scalars['String']['input'];
  imageIcon?: InputMaybe<Scalars['String']['input']>;
  link?: InputMaybe<Scalars['String']['input']>;
  localization?: InputMaybe<LocalizationInput>;
  name?: InputMaybe<Scalars['String']['input']>;
  time?: InputMaybe<Scalars['String']['input']>;
  userIds?: InputMaybe<Array<Scalars['String']['input']>>;
};

export enum ExampleColor {
  Black = 'BLACK',
  Blue = 'BLUE',
  Brown = 'BROWN',
  Green = 'GREEN',
  Orange = 'ORANGE',
  Pink = 'PINK',
  Purple = 'PURPLE',
  Red = 'RED',
  White = 'WHITE',
  Yellow = 'YELLOW'
}

export type ExampleCreateInput = {
  color: ExampleColor;
  name: Scalars['String']['input'];
};

export type ExampleFindManyInput = {
  color?: InputMaybe<Array<ExampleColor>>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type ExampleFindManySortInput = {
  color?: InputMaybe<SortInput>;
  name?: InputMaybe<SortInput>;
};

export type ExampleInput = {
  id: Scalars['ObjectID']['input'];
};

export type ExampleObject = {
  __typename?: 'ExampleObject';
  color: ExampleColor;
  id: Scalars['ObjectID']['output'];
  name: Scalars['String']['output'];
};

export type ExamplePaginationResponse = {
  __typename?: 'ExamplePaginationResponse';
  data: Array<ExampleObject>;
  metadata: PaginationMetadata;
};

export type ExampleUpdateInput = {
  color?: InputMaybe<ExampleColor>;
  id: Scalars['ObjectID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
};

export type LeaderboardEntryObject = {
  __typename?: 'LeaderboardEntryObject';
  activityPoints: Scalars['Float']['output'];
  avatarUrl?: Maybe<Scalars['String']['output']>;
  challengePoints: Scalars['Float']['output'];
  email: Scalars['String']['output'];
  firstname: Scalars['String']['output'];
  id: Scalars['ObjectID']['output'];
  lastname: Scalars['String']['output'];
  rank: Scalars['Float']['output'];
  totalPoints: Scalars['Float']['output'];
};

export type LeaderboardFindInput = {
  endDate?: InputMaybe<Scalars['DateTime']['input']>;
  limit?: Scalars['Int']['input'];
  startDate?: InputMaybe<Scalars['DateTime']['input']>;
};

export type LocalizationInput = {
  /** Distance in kilometers */
  distance: Scalars['Float']['input'];
  /** Your current latitude */
  latitude: Scalars['Float']['input'];
  /** Your current longitude */
  longitude: Scalars['Float']['input'];
};

export type MarketplaceCreateInput = {
  description: Scalars['String']['input'];
  name: Scalars['String']['input'];
  price: Scalars['Float']['input'];
};

export type MarketplaceFindManyInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type MarketplaceFindManySortInput = {
  createdAt?: InputMaybe<SortInput>;
  name?: InputMaybe<SortInput>;
  price?: InputMaybe<SortInput>;
  updatedAt?: InputMaybe<SortInput>;
};

export type MarketplaceInput = {
  id: Scalars['ObjectID']['input'];
};

export type MarketplaceObject = {
  __typename?: 'MarketplaceObject';
  createdAt: Scalars['DateTime']['output'];
  description: Scalars['String']['output'];
  id: Scalars['ObjectID']['output'];
  name: Scalars['String']['output'];
  price: Scalars['Float']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type MarketplacePaginationResponse = {
  __typename?: 'MarketplacePaginationResponse';
  data: Array<MarketplaceObject>;
  metadata: PaginationMetadata;
};

export type MarketplacePurchaseInput = {
  marketplaceId: Scalars['ObjectID']['input'];
  userId: Scalars['ObjectID']['input'];
};

export type MarketplaceUpdateInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ObjectID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  price?: InputMaybe<Scalars['Float']['input']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  activityAddPathPoint: ActivityObject;
  activityAddScore: ActivityObject;
  activityAddTrash: ActivityObject;
  activityCreate: ActivityObject;
  activityDelete?: Maybe<ActivityObject>;
  activityEnd: ActivityObject;
  activityStart: ActivityObject;
  activityUpdate?: Maybe<ActivityObject>;
  awardCreate: AwardObject;
  awardDelete?: Maybe<AwardObject>;
  awardUpdate?: Maybe<AwardObject>;
  challengeCreate: ChallengeObject;
  challengeDelete?: Maybe<ChallengeObject>;
  challengeStart: UserChallengeProgressObject;
  challengeUpdate?: Maybe<ChallengeObject>;
  challengeUpdateProgress: UserChallengeProgressObject;
  eventCreate: EventObject;
  eventDelete?: Maybe<EventObject>;
  eventUpdate?: Maybe<EventObject>;
  exampleCreate: ExampleObject;
  exampleDelete: Success;
  exampleUpdate: ExampleObject;
  marketplaceCreate: MarketplaceObject;
  marketplaceDelete?: Maybe<MarketplaceObject>;
  marketplacePurchase: MarketplaceObject;
  marketplaceUpdate?: Maybe<MarketplaceObject>;
  userAddAward: UserObject;
  userCreate: UserObject;
};


export type MutationActivityAddPathPointArgs = {
  input: ActivityAddPathPointInput;
};


export type MutationActivityAddScoreArgs = {
  input: ActivityAddScoreInput;
};


export type MutationActivityAddTrashArgs = {
  input: ActivityAddTrashInput;
};


export type MutationActivityCreateArgs = {
  input: ActivityCreateInput;
};


export type MutationActivityDeleteArgs = {
  input: ActivityInput;
};


export type MutationActivityEndArgs = {
  input: ActivityEndInput;
};


export type MutationActivityStartArgs = {
  input: ActivityStartInput;
};


export type MutationActivityUpdateArgs = {
  input: ActivityUpdateInput;
};


export type MutationAwardCreateArgs = {
  input: AwardCreateInput;
};


export type MutationAwardDeleteArgs = {
  input: AwardInput;
};


export type MutationAwardUpdateArgs = {
  input: AwardUpdateInput;
};


export type MutationChallengeCreateArgs = {
  input: ChallengeCreateInput;
};


export type MutationChallengeDeleteArgs = {
  input: ChallengeInput;
};


export type MutationChallengeStartArgs = {
  input: ChallengeStartInput;
};


export type MutationChallengeUpdateArgs = {
  input: ChallengeUpdateInput;
};


export type MutationChallengeUpdateProgressArgs = {
  input: ChallengeUpdateProgressInput;
};


export type MutationEventCreateArgs = {
  input: EventCreateInput;
};


export type MutationEventDeleteArgs = {
  input: EventInput;
};


export type MutationEventUpdateArgs = {
  input: EventUpdateInput;
};


export type MutationExampleCreateArgs = {
  input: ExampleCreateInput;
};


export type MutationExampleDeleteArgs = {
  input: ExampleInput;
};


export type MutationExampleUpdateArgs = {
  input: ExampleUpdateInput;
};


export type MutationMarketplaceCreateArgs = {
  input: MarketplaceCreateInput;
};


export type MutationMarketplaceDeleteArgs = {
  input: MarketplaceInput;
};


export type MutationMarketplacePurchaseArgs = {
  input: MarketplacePurchaseInput;
};


export type MutationMarketplaceUpdateArgs = {
  input: MarketplaceUpdateInput;
};


export type MutationUserAddAwardArgs = {
  input: UserAddAwardInput;
};


export type MutationUserCreateArgs = {
  input: UserCreateInput;
};

export type PaginationInput = {
  /** default: 1 */
  page?: Scalars['Int']['input'];
  /** default: 10, minimum: 1, max: 100 */
  pageSize?: Scalars['Int']['input'];
};

export type PaginationMetadata = {
  __typename?: 'PaginationMetadata';
  currentPage: Scalars['Int']['output'];
  pageSize: Scalars['Int']['output'];
  totalCount: Scalars['Int']['output'];
  totalPages: Scalars['Int']['output'];
};

export type PathPointInput = {
  lat: Scalars['String']['input'];
  lon: Scalars['String']['input'];
};

export type PathPointObject = {
  __typename?: 'PathPointObject';
  lat: Scalars['String']['output'];
  lon: Scalars['String']['output'];
};

export type PathPointUpdateInput = {
  lat?: InputMaybe<Scalars['String']['input']>;
  lon?: InputMaybe<Scalars['String']['input']>;
};

export type Query = {
  __typename?: 'Query';
  activities: ActivityPaginationResponse;
  activitiesThrashMap: Array<PathPointObject>;
  activity?: Maybe<ActivityObject>;
  activityCurrentDuration?: Maybe<Scalars['Float']['output']>;
  activityStarted?: Maybe<ActivityObject>;
  award?: Maybe<AwardObject>;
  awards: AwardPaginationResponse;
  challenge?: Maybe<ChallengeObject>;
  challenges: ChallengePaginationResponse;
  errors: Array<Error>;
  event?: Maybe<EventObject>;
  events: EventPaginationResponse;
  example: ExampleObject;
  examples: ExamplePaginationResponse;
  /** Get top users by total points (activities + challenges) with optional date filtering */
  leaderboard: Array<LeaderboardEntryObject>;
  marketplace?: Maybe<MarketplaceObject>;
  marketplaces: MarketplacePaginationResponse;
  minioTest: Scalars['String']['output'];
  user?: Maybe<UserObject>;
  userChallengeProgress: Array<UserChallengeProgressObject>;
  users: UserPaginationResponse;
};


export type QueryActivitiesArgs = {
  input: ActivityFindManyInput;
  pagination: PaginationInput;
  sort: ActivityFindManySortInput;
};


export type QueryActivityArgs = {
  input: ActivityInput;
};


export type QueryActivityCurrentDurationArgs = {
  activityId: Scalars['String']['input'];
};


export type QueryActivityStartedArgs = {
  userId: Scalars['String']['input'];
};


export type QueryAwardArgs = {
  input: AwardInput;
};


export type QueryAwardsArgs = {
  input: AwardFindManyInput;
  pagination: PaginationInput;
  sort: AwardFindManySortInput;
};


export type QueryChallengeArgs = {
  input: ChallengeInput;
};


export type QueryChallengesArgs = {
  input: ChallengeFindManyInput;
  pagination: PaginationInput;
  sort: ChallengeFindManySortInput;
};


export type QueryEventArgs = {
  input: EventInput;
};


export type QueryEventsArgs = {
  input: EventFindManyInput;
  pagination: PaginationInput;
  sort: EventFindManySortInput;
};


export type QueryExampleArgs = {
  input: ExampleInput;
};


export type QueryExamplesArgs = {
  input: ExampleFindManyInput;
  pagination: PaginationInput;
  sort: ExampleFindManySortInput;
};


export type QueryLeaderboardArgs = {
  input: LeaderboardFindInput;
};


export type QueryMarketplaceArgs = {
  input: MarketplaceInput;
};


export type QueryMarketplacesArgs = {
  input: MarketplaceFindManyInput;
  pagination: PaginationInput;
  sort: MarketplaceFindManySortInput;
};


export type QueryUserArgs = {
  input: UserInput;
};


export type QueryUserChallengeProgressArgs = {
  input: ChallengeProgressFindInput;
};


export type QueryUsersArgs = {
  input: UserFindManyInput;
  pagination: PaginationInput;
  sort: UserFindManySortInput;
};

export enum Sort {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type SortInput = {
  direction: Sort;
};

export type Success = {
  __typename?: 'Success';
  success: Scalars['Boolean']['output'];
};

export type UserAddAwardInput = {
  awardId: Scalars['ObjectID']['input'];
  userId: Scalars['ObjectID']['input'];
};

export type UserChallengeProgressObject = {
  __typename?: 'UserChallengeProgressObject';
  challenge?: Maybe<ChallengeObject>;
  challengeId: Scalars['ObjectID']['output'];
  completedAt?: Maybe<Scalars['DateTime']['output']>;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ObjectID']['output'];
  progress: Scalars['Int']['output'];
  startedAt: Scalars['DateTime']['output'];
  status: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  userId: Scalars['ObjectID']['output'];
};

export type UserCreateInput = {
  avatarUrl?: InputMaybe<Scalars['String']['input']>;
  awardIds?: InputMaybe<Array<Scalars['ObjectID']['input']>>;
  email: Scalars['String']['input'];
  firstname: Scalars['String']['input'];
  lastname: Scalars['String']['input'];
};

export type UserFindManyInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  firstname?: InputMaybe<Scalars['String']['input']>;
  lastname?: InputMaybe<Scalars['String']['input']>;
};

export type UserFindManySortInput = {
  createdAt?: InputMaybe<SortInput>;
  email?: InputMaybe<SortInput>;
  firstname?: InputMaybe<SortInput>;
  lastname?: InputMaybe<SortInput>;
  updatedAt?: InputMaybe<SortInput>;
};

export type UserInput = {
  id: Scalars['ObjectID']['input'];
};

export type UserObject = {
  __typename?: 'UserObject';
  avatarUrl?: Maybe<Scalars['String']['output']>;
  awardIds: Array<Scalars['ObjectID']['output']>;
  awards: Array<AwardObject>;
  challengeProgress: Array<UserChallengeProgressObject>;
  challenges: Array<ChallengeObject>;
  coin: Scalars['Float']['output'];
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  firstname: Scalars['String']['output'];
  id: Scalars['ObjectID']['output'];
  lastname: Scalars['String']['output'];
  points: Scalars['Float']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type UserPaginationResponse = {
  __typename?: 'UserPaginationResponse';
  data: Array<UserObject>;
  metadata: PaginationMetadata;
};

export type EventsQueryVariables = Exact<{
  input: EventFindManyInput;
  pagination: PaginationInput;
  sort: EventFindManySortInput;
}>;


export type EventsQuery = { __typename?: 'Query', events: { __typename?: 'EventPaginationResponse', data: Array<{ __typename?: 'EventObject', id: any, name: string, time: any, date: any, place: string, localization: Array<number>, imageUrl: string, link?: string | null, eventType: EventType, userIds: Array<string>, createdAt: any, updatedAt: any }>, metadata: { __typename?: 'PaginationMetadata', pageSize: number, currentPage: number, totalPages: number, totalCount: number } } };

export type QueryQueryVariables = Exact<{ [key: string]: never; }>;


export type QueryQuery = { __typename?: 'Query', minioTest: string };

export type ActivitiesQueryVariables = Exact<{
  input: ActivityFindManyInput;
  pagination: PaginationInput;
  sort: ActivityFindManySortInput;
}>;


export type ActivitiesQuery = { __typename?: 'Query', activities: { __typename?: 'ActivityPaginationResponse', data: Array<{ __typename?: 'ActivityObject', activityType: ActivityType, createdAt: any, currentDuration?: number | null, description?: string | null, distance: number, durationTime: number, endTime?: any | null, id: any, imageUrls: Array<string>, name?: string | null, points: number, startTime?: any | null, trashCount: number, updatedAt: any, userId: any, path: Array<{ __typename?: 'PathPointObject', lat: string, lon: string }>, trashLocations: Array<{ __typename?: 'PathPointObject', lat: string, lon: string }>, user?: { __typename?: 'UserObject', avatarUrl?: string | null, id: any, firstname: string, lastname: string } | null }> } };

export type ActivityAddPathPointMutationVariables = Exact<{
  input: ActivityAddPathPointInput;
}>;


export type ActivityAddPathPointMutation = { __typename?: 'Mutation', activityAddPathPoint: { __typename?: 'ActivityObject', id: any } };

export type ActivityAddTrashMutationVariables = Exact<{
  input: ActivityAddTrashInput;
}>;


export type ActivityAddTrashMutation = { __typename?: 'Mutation', activityAddTrash: { __typename?: 'ActivityObject', id: any } };

export type ActivityEndMutationVariables = Exact<{
  input: ActivityEndInput;
}>;


export type ActivityEndMutation = { __typename?: 'Mutation', activityEnd: { __typename?: 'ActivityObject', id: any } };

export type ActivityStartMutationVariables = Exact<{
  input: ActivityStartInput;
}>;


export type ActivityStartMutation = { __typename?: 'Mutation', activityStart: { __typename?: 'ActivityObject', id: any } };

export type ActivityTypesQueryVariables = Exact<{ [key: string]: never; }>;


export type ActivityTypesQuery = { __typename?: 'Query', activities: { __typename?: 'ActivityPaginationResponse', data: Array<{ __typename?: 'ActivityObject', activityType: ActivityType }> } };

export type ActivityUpdateMutationVariables = Exact<{
  input: ActivityUpdateInput;
}>;


export type ActivityUpdateMutation = { __typename?: 'Mutation', activityUpdate?: { __typename?: 'ActivityObject', id: any } | null };

export type MarketplaceDetailsQueryVariables = Exact<{
  input: MarketplaceInput;
}>;


export type MarketplaceDetailsQuery = {
  __typename?: 'Query',
  marketplace?: {
    __typename?: 'MarketplaceObject',
    createdAt: any,
    description: string,
    id: any,
    name: string,
    price: number,
    updatedAt: any
  } | null
};

export type MarketplacePurchaseMutationVariables = Exact<{
  input: MarketplacePurchaseInput;
}>;


export type MarketplacePurchaseMutation = {
  __typename?: 'Mutation',
  marketplacePurchase: { __typename?: 'MarketplaceObject', id: any }
};

export type MarketplacesQueryVariables = Exact<{
  input: MarketplaceFindManyInput;
}>;


export type MarketplacesQuery = {
  __typename?: 'Query',
  marketplaces: {
    __typename?: 'MarketplacePaginationResponse',
    data: Array<{
      __typename?: 'MarketplaceObject',
      createdAt: any,
      description: string,
      id: any,
      name: string,
      price: number,
      updatedAt: any
    }>
  }
};

export type UserQueryVariables = Exact<{ [key: string]: never; }>;


export type UserQuery = { __typename?: 'Query', user?: { __typename?: 'UserObject', id: any, email: string, firstname: string, lastname: string, avatarUrl?: string | null, coin: number, challengeProgress: Array<{ __typename?: 'UserChallengeProgressObject', challengeId: any, id: any, progress: number, status: string }> } | null };

export type RankingQueryVariables = Exact<{
  input: LeaderboardFindInput;
}>;


export type RankingQuery = { __typename?: 'Query', leaderboard: Array<{ __typename?: 'LeaderboardEntryObject', id: any, firstname: string, lastname: string, activityPoints: number, avatarUrl?: string | null, rank: number, challengePoints: number, totalPoints: number }> };


export const EventsDocument = gql`
    query Events($input: EventFindManyInput!, $pagination: PaginationInput!, $sort: EventFindManySortInput!) {
  events(input: $input, pagination: $pagination, sort: $sort) {
    data {
      id
      name
      time
      date
      place
      localization
      imageUrl
      link
      eventType
      userIds
      createdAt
      updatedAt
    }
    metadata {
      pageSize
      currentPage
      totalPages
      totalCount
    }
  }
}
    `;

/**
 * __useEventsQuery__
 *
 * To run a query within a React component, call `useEventsQuery` and pass it any options that fit your needs.
 * When your component renders, `useEventsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEventsQuery({
 *   variables: {
 *      input: // value for 'input'
 *      pagination: // value for 'pagination'
 *      sort: // value for 'sort'
 *   },
 * });
 */
export function useEventsQuery(baseOptions: Apollo.QueryHookOptions<EventsQuery, EventsQueryVariables> & ({ variables: EventsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<EventsQuery, EventsQueryVariables>(EventsDocument, options);
      }
export function useEventsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<EventsQuery, EventsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<EventsQuery, EventsQueryVariables>(EventsDocument, options);
        }
export function useEventsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<EventsQuery, EventsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<EventsQuery, EventsQueryVariables>(EventsDocument, options);
        }
export type EventsQueryHookResult = ReturnType<typeof useEventsQuery>;
export type EventsLazyQueryHookResult = ReturnType<typeof useEventsLazyQuery>;
export type EventsSuspenseQueryHookResult = ReturnType<typeof useEventsSuspenseQuery>;
export type EventsQueryResult = Apollo.QueryResult<EventsQuery, EventsQueryVariables>;
export const QueryDocument = gql`
    query Query {
  minioTest
}
    `;

/**
 * __useQueryQuery__
 *
 * To run a query within a React component, call `useQueryQuery` and pass it any options that fit your needs.
 * When your component renders, `useQueryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useQueryQuery({
 *   variables: {
 *   },
 * });
 */
export function useQueryQuery(baseOptions?: Apollo.QueryHookOptions<QueryQuery, QueryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<QueryQuery, QueryQueryVariables>(QueryDocument, options);
      }
export function useQueryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<QueryQuery, QueryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<QueryQuery, QueryQueryVariables>(QueryDocument, options);
        }
export function useQuerySuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<QueryQuery, QueryQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<QueryQuery, QueryQueryVariables>(QueryDocument, options);
        }
export type QueryQueryHookResult = ReturnType<typeof useQueryQuery>;
export type QueryLazyQueryHookResult = ReturnType<typeof useQueryLazyQuery>;
export type QuerySuspenseQueryHookResult = ReturnType<typeof useQuerySuspenseQuery>;
export type QueryQueryResult = Apollo.QueryResult<QueryQuery, QueryQueryVariables>;
export const ActivitiesDocument = gql`
    query Activities($input: ActivityFindManyInput!, $pagination: PaginationInput!, $sort: ActivityFindManySortInput!) {
  activities(input: $input, pagination: $pagination, sort: $sort) {
    data {
      activityType
      createdAt
      currentDuration
      description
      distance
      durationTime
      endTime
      id
      imageUrls
      name
      path {
        lat
        lon
      }
      points
      startTime
      trashCount
      trashLocations {
        lat
        lon
      }
      updatedAt
      user {
        avatarUrl
        id
        firstname
        lastname
      }
      userId
    }
  }
}
    `;

/**
 * __useActivitiesQuery__
 *
 * To run a query within a React component, call `useActivitiesQuery` and pass it any options that fit your needs.
 * When your component renders, `useActivitiesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useActivitiesQuery({
 *   variables: {
 *      input: // value for 'input'
 *      pagination: // value for 'pagination'
 *      sort: // value for 'sort'
 *   },
 * });
 */
export function useActivitiesQuery(baseOptions: Apollo.QueryHookOptions<ActivitiesQuery, ActivitiesQueryVariables> & ({ variables: ActivitiesQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ActivitiesQuery, ActivitiesQueryVariables>(ActivitiesDocument, options);
      }
export function useActivitiesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ActivitiesQuery, ActivitiesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ActivitiesQuery, ActivitiesQueryVariables>(ActivitiesDocument, options);
        }
export function useActivitiesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ActivitiesQuery, ActivitiesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ActivitiesQuery, ActivitiesQueryVariables>(ActivitiesDocument, options);
        }
export type ActivitiesQueryHookResult = ReturnType<typeof useActivitiesQuery>;
export type ActivitiesLazyQueryHookResult = ReturnType<typeof useActivitiesLazyQuery>;
export type ActivitiesSuspenseQueryHookResult = ReturnType<typeof useActivitiesSuspenseQuery>;
export type ActivitiesQueryResult = Apollo.QueryResult<ActivitiesQuery, ActivitiesQueryVariables>;
export const ActivityAddPathPointDocument = gql`
    mutation ActivityAddPathPoint($input: ActivityAddPathPointInput!) {
  activityAddPathPoint(input: $input) {
    id
  }
}
    `;
export type ActivityAddPathPointMutationFn = Apollo.MutationFunction<ActivityAddPathPointMutation, ActivityAddPathPointMutationVariables>;

/**
 * __useActivityAddPathPointMutation__
 *
 * To run a mutation, you first call `useActivityAddPathPointMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useActivityAddPathPointMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [activityAddPathPointMutation, { data, loading, error }] = useActivityAddPathPointMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useActivityAddPathPointMutation(baseOptions?: Apollo.MutationHookOptions<ActivityAddPathPointMutation, ActivityAddPathPointMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ActivityAddPathPointMutation, ActivityAddPathPointMutationVariables>(ActivityAddPathPointDocument, options);
      }
export type ActivityAddPathPointMutationHookResult = ReturnType<typeof useActivityAddPathPointMutation>;
export type ActivityAddPathPointMutationResult = Apollo.MutationResult<ActivityAddPathPointMutation>;
export type ActivityAddPathPointMutationOptions = Apollo.BaseMutationOptions<ActivityAddPathPointMutation, ActivityAddPathPointMutationVariables>;
export const ActivityAddTrashDocument = gql`
    mutation ActivityAddTrash($input: ActivityAddTrashInput!) {
  activityAddTrash(input: $input) {
    id
  }
}
    `;
export type ActivityAddTrashMutationFn = Apollo.MutationFunction<ActivityAddTrashMutation, ActivityAddTrashMutationVariables>;

/**
 * __useActivityAddTrashMutation__
 *
 * To run a mutation, you first call `useActivityAddTrashMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useActivityAddTrashMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [activityAddTrashMutation, { data, loading, error }] = useActivityAddTrashMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useActivityAddTrashMutation(baseOptions?: Apollo.MutationHookOptions<ActivityAddTrashMutation, ActivityAddTrashMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ActivityAddTrashMutation, ActivityAddTrashMutationVariables>(ActivityAddTrashDocument, options);
      }
export type ActivityAddTrashMutationHookResult = ReturnType<typeof useActivityAddTrashMutation>;
export type ActivityAddTrashMutationResult = Apollo.MutationResult<ActivityAddTrashMutation>;
export type ActivityAddTrashMutationOptions = Apollo.BaseMutationOptions<ActivityAddTrashMutation, ActivityAddTrashMutationVariables>;
export const ActivityEndDocument = gql`
    mutation ActivityEnd($input: ActivityEndInput!) {
  activityEnd(input: $input) {
    id
  }
}
    `;
export type ActivityEndMutationFn = Apollo.MutationFunction<ActivityEndMutation, ActivityEndMutationVariables>;

/**
 * __useActivityEndMutation__
 *
 * To run a mutation, you first call `useActivityEndMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useActivityEndMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [activityEndMutation, { data, loading, error }] = useActivityEndMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useActivityEndMutation(baseOptions?: Apollo.MutationHookOptions<ActivityEndMutation, ActivityEndMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ActivityEndMutation, ActivityEndMutationVariables>(ActivityEndDocument, options);
      }
export type ActivityEndMutationHookResult = ReturnType<typeof useActivityEndMutation>;
export type ActivityEndMutationResult = Apollo.MutationResult<ActivityEndMutation>;
export type ActivityEndMutationOptions = Apollo.BaseMutationOptions<ActivityEndMutation, ActivityEndMutationVariables>;
export const ActivityStartDocument = gql`
    mutation ActivityStart($input: ActivityStartInput!) {
  activityStart(input: $input) {
    id
  }
}
    `;
export type ActivityStartMutationFn = Apollo.MutationFunction<ActivityStartMutation, ActivityStartMutationVariables>;

/**
 * __useActivityStartMutation__
 *
 * To run a mutation, you first call `useActivityStartMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useActivityStartMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [activityStartMutation, { data, loading, error }] = useActivityStartMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useActivityStartMutation(baseOptions?: Apollo.MutationHookOptions<ActivityStartMutation, ActivityStartMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ActivityStartMutation, ActivityStartMutationVariables>(ActivityStartDocument, options);
      }
export type ActivityStartMutationHookResult = ReturnType<typeof useActivityStartMutation>;
export type ActivityStartMutationResult = Apollo.MutationResult<ActivityStartMutation>;
export type ActivityStartMutationOptions = Apollo.BaseMutationOptions<ActivityStartMutation, ActivityStartMutationVariables>;
export const ActivityTypesDocument = gql`
    query ActivityTypes {
  activities(input: {}, pagination: {}, sort: {}) {
    data {
      activityType
    }
  }
}
    `;

/**
 * __useActivityTypesQuery__
 *
 * To run a query within a React component, call `useActivityTypesQuery` and pass it any options that fit your needs.
 * When your component renders, `useActivityTypesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useActivityTypesQuery({
 *   variables: {
 *   },
 * });
 */
export function useActivityTypesQuery(baseOptions?: Apollo.QueryHookOptions<ActivityTypesQuery, ActivityTypesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ActivityTypesQuery, ActivityTypesQueryVariables>(ActivityTypesDocument, options);
      }
export function useActivityTypesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ActivityTypesQuery, ActivityTypesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ActivityTypesQuery, ActivityTypesQueryVariables>(ActivityTypesDocument, options);
        }
export function useActivityTypesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ActivityTypesQuery, ActivityTypesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ActivityTypesQuery, ActivityTypesQueryVariables>(ActivityTypesDocument, options);
        }
export type ActivityTypesQueryHookResult = ReturnType<typeof useActivityTypesQuery>;
export type ActivityTypesLazyQueryHookResult = ReturnType<typeof useActivityTypesLazyQuery>;
export type ActivityTypesSuspenseQueryHookResult = ReturnType<typeof useActivityTypesSuspenseQuery>;
export type ActivityTypesQueryResult = Apollo.QueryResult<ActivityTypesQuery, ActivityTypesQueryVariables>;
export const ActivityUpdateDocument = gql`
    mutation ActivityUpdate($input: ActivityUpdateInput!) {
  activityUpdate(input: $input) {
    id
  }
}
    `;
export type ActivityUpdateMutationFn = Apollo.MutationFunction<ActivityUpdateMutation, ActivityUpdateMutationVariables>;

/**
 * __useActivityUpdateMutation__
 *
 * To run a mutation, you first call `useActivityUpdateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useActivityUpdateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [activityUpdateMutation, { data, loading, error }] = useActivityUpdateMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useActivityUpdateMutation(baseOptions?: Apollo.MutationHookOptions<ActivityUpdateMutation, ActivityUpdateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ActivityUpdateMutation, ActivityUpdateMutationVariables>(ActivityUpdateDocument, options);
      }
export type ActivityUpdateMutationHookResult = ReturnType<typeof useActivityUpdateMutation>;
export type ActivityUpdateMutationResult = Apollo.MutationResult<ActivityUpdateMutation>;
export type ActivityUpdateMutationOptions = Apollo.BaseMutationOptions<ActivityUpdateMutation, ActivityUpdateMutationVariables>;
export const MarketplaceDetailsDocument = gql`
  query MarketplaceDetails($input: MarketplaceInput!) {
    marketplace(input: $input) {
      createdAt
      description
      id
      name
      price
      updatedAt
    }
  }
`;

/**
 * __useMarketplaceDetailsQuery__
 *
 * To run a query within a React component, call `useMarketplaceDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useMarketplaceDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMarketplaceDetailsQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useMarketplaceDetailsQuery(baseOptions: Apollo.QueryHookOptions<MarketplaceDetailsQuery, MarketplaceDetailsQueryVariables> & ({
  variables: MarketplaceDetailsQueryVariables;
  skip?: boolean;
} | { skip: boolean; })) {
  const options = {...defaultOptions, ...baseOptions}
  return Apollo.useQuery<MarketplaceDetailsQuery, MarketplaceDetailsQueryVariables>(MarketplaceDetailsDocument, options);
}
export function useMarketplaceDetailsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MarketplaceDetailsQuery, MarketplaceDetailsQueryVariables>) {
  const options = {...defaultOptions, ...baseOptions}
  return Apollo.useLazyQuery<MarketplaceDetailsQuery, MarketplaceDetailsQueryVariables>(MarketplaceDetailsDocument, options);
}
export function useMarketplaceDetailsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<MarketplaceDetailsQuery, MarketplaceDetailsQueryVariables>) {
  const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
  return Apollo.useSuspenseQuery<MarketplaceDetailsQuery, MarketplaceDetailsQueryVariables>(MarketplaceDetailsDocument, options);
}
export type MarketplaceDetailsQueryHookResult = ReturnType<typeof useMarketplaceDetailsQuery>;
export type MarketplaceDetailsLazyQueryHookResult = ReturnType<typeof useMarketplaceDetailsLazyQuery>;
export type MarketplaceDetailsSuspenseQueryHookResult = ReturnType<typeof useMarketplaceDetailsSuspenseQuery>;
export type MarketplaceDetailsQueryResult = Apollo.QueryResult<MarketplaceDetailsQuery, MarketplaceDetailsQueryVariables>;
export const MarketplacePurchaseDocument = gql`
  mutation MarketplacePurchase($input: MarketplacePurchaseInput!) {
    marketplacePurchase(input: $input) {
      id
    }
  }
`;
export type MarketplacePurchaseMutationFn = Apollo.MutationFunction<MarketplacePurchaseMutation, MarketplacePurchaseMutationVariables>;

/**
 * __useMarketplacePurchaseMutation__
 *
 * To run a mutation, you first call `useMarketplacePurchaseMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMarketplacePurchaseMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [marketplacePurchaseMutation, { data, loading, error }] = useMarketplacePurchaseMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useMarketplacePurchaseMutation(baseOptions?: Apollo.MutationHookOptions<MarketplacePurchaseMutation, MarketplacePurchaseMutationVariables>) {
  const options = {...defaultOptions, ...baseOptions}
  return Apollo.useMutation<MarketplacePurchaseMutation, MarketplacePurchaseMutationVariables>(MarketplacePurchaseDocument, options);
}

export type MarketplacePurchaseMutationHookResult = ReturnType<typeof useMarketplacePurchaseMutation>;
export type MarketplacePurchaseMutationResult = Apollo.MutationResult<MarketplacePurchaseMutation>;
export type MarketplacePurchaseMutationOptions = Apollo.BaseMutationOptions<MarketplacePurchaseMutation, MarketplacePurchaseMutationVariables>;
export const MarketplacesDocument = gql`
  query Marketplaces($input: MarketplaceFindManyInput!) {
    marketplaces(input: $input, pagination: {}, sort: {}) {
      data {
        createdAt
        description
        id
        name
        price
        updatedAt
      }
    }
  }
`;

/**
 * __useMarketplacesQuery__
 *
 * To run a query within a React component, call `useMarketplacesQuery` and pass it any options that fit your needs.
 * When your component renders, `useMarketplacesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMarketplacesQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useMarketplacesQuery(baseOptions: Apollo.QueryHookOptions<MarketplacesQuery, MarketplacesQueryVariables> & ({
  variables: MarketplacesQueryVariables;
  skip?: boolean;
} | { skip: boolean; })) {
  const options = {...defaultOptions, ...baseOptions}
  return Apollo.useQuery<MarketplacesQuery, MarketplacesQueryVariables>(MarketplacesDocument, options);
}
export function useMarketplacesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MarketplacesQuery, MarketplacesQueryVariables>) {
  const options = {...defaultOptions, ...baseOptions}
  return Apollo.useLazyQuery<MarketplacesQuery, MarketplacesQueryVariables>(MarketplacesDocument, options);
}
export function useMarketplacesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<MarketplacesQuery, MarketplacesQueryVariables>) {
  const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
  return Apollo.useSuspenseQuery<MarketplacesQuery, MarketplacesQueryVariables>(MarketplacesDocument, options);
}
export type MarketplacesQueryHookResult = ReturnType<typeof useMarketplacesQuery>;
export type MarketplacesLazyQueryHookResult = ReturnType<typeof useMarketplacesLazyQuery>;
export type MarketplacesSuspenseQueryHookResult = ReturnType<typeof useMarketplacesSuspenseQuery>;
export type MarketplacesQueryResult = Apollo.QueryResult<MarketplacesQuery, MarketplacesQueryVariables>;
export const UserDocument = gql`
    query User {
  user(input: {id: "685fc7347afcbf34e1fd67a6"}) {
    id
    email
    firstname
    lastname
    avatarUrl
    coin
    challengeProgress {
      challengeId
      id
      progress
      status
    }
  }
}
    `;

/**
 * __useUserQuery__
 *
 * To run a query within a React component, call `useUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useUserQuery(baseOptions?: Apollo.QueryHookOptions<UserQuery, UserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserQuery, UserQueryVariables>(UserDocument, options);
      }
export function useUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserQuery, UserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserQuery, UserQueryVariables>(UserDocument, options);
        }
export function useUserSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<UserQuery, UserQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<UserQuery, UserQueryVariables>(UserDocument, options);
        }
export type UserQueryHookResult = ReturnType<typeof useUserQuery>;
export type UserLazyQueryHookResult = ReturnType<typeof useUserLazyQuery>;
export type UserSuspenseQueryHookResult = ReturnType<typeof useUserSuspenseQuery>;
export type UserQueryResult = Apollo.QueryResult<UserQuery, UserQueryVariables>;
export const RankingDocument = gql`
    query Ranking($input: LeaderboardFindInput!) {
  leaderboard(input: $input) {
    id
    firstname
    lastname
    activityPoints
    avatarUrl
    rank
    challengePoints
    totalPoints
  }
}
    `;

/**
 * __useRankingQuery__
 *
 * To run a query within a React component, call `useRankingQuery` and pass it any options that fit your needs.
 * When your component renders, `useRankingQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRankingQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRankingQuery(baseOptions: Apollo.QueryHookOptions<RankingQuery, RankingQueryVariables> & ({ variables: RankingQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<RankingQuery, RankingQueryVariables>(RankingDocument, options);
      }
export function useRankingLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<RankingQuery, RankingQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<RankingQuery, RankingQueryVariables>(RankingDocument, options);
        }
export function useRankingSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<RankingQuery, RankingQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<RankingQuery, RankingQueryVariables>(RankingDocument, options);
        }
export type RankingQueryHookResult = ReturnType<typeof useRankingQuery>;
export type RankingLazyQueryHookResult = ReturnType<typeof useRankingLazyQuery>;
export type RankingSuspenseQueryHookResult = ReturnType<typeof useRankingSuspenseQuery>;
export type RankingQueryResult = Apollo.QueryResult<RankingQuery, RankingQueryVariables>;