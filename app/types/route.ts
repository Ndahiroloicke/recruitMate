import type { RoutePathSchema } from '#build/typed-router/__paths'
import type { RoutesNamedLocationsResolved } from '#build/typed-router/__routes'

export type RouteRecordName = RoutesNamedLocationsResolved['name']
export type RouteRecordPath = RoutePathSchema
