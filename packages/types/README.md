# `@brickninjaapi/types`

TypeScript types for all datastructures used by the Brick Ninja API.

## Usage

You can use this library to add strong types when working with the Brick Ninja API and not using `@brickninjaapi/fetch` or `@brickninjaapi/client`, for example when using your own api client, working with data from a database, or writing helper functions.

```ts
import type { BrickNinjaApi, EndpointType } from '@brickninjaapi/types';

function getItemName(item: BrickNinjaApi.V1.Item) {
  return item.name;
}

type ItemEndpointResponse = EndpointType<'/v2/items?ids=1,2,3'>;
// -> Array<{ id: number, name: string, ... }>
```

## Installation

```sh
npm i @brickninjaapi/types
```

## Contributing

See [parent readme](../../README.md#contributing).

## License

Licensed under the [MIT License](./LICENSE).