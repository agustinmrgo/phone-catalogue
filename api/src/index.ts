// Re-export all generated types and SDK
export * from '../generated/types.gen';
export * from '../generated/sdk.gen';
export * from '../generated/client.gen';

// Export type aliases for common use cases
export type {
  Phone,
  PaginationInfo,
  PhonesStats,
  BaseResponse,
  HealthResponse,
  PhoneResponse,
  PhonesResponse,
  PhonesStatsResponse,
  ErrorResponse,
  GetPhonesData,
  GetPhoneByIdData,
  GetPhonesStatsData
} from '../generated/types.gen';