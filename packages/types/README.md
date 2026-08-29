# `@brickninjaapi/types`

TypeScript types for all datastructures used by the Brick Ninja API.

## Usage

You can use this library to add strong types when working with the Brick Ninja API without using `@brickninjaapi/fetch` or `@brickninjaapi/client`, for example with your own API client, data from a database, or helper functions.

```ts
import type { EndpointType } from '@brickninjaapi/types/endpoints';
import type { Product } from '@brickninjaapi/types/data/product';

function getProductName(product: Product) {
  return product.name;
}

function getItemName(item: EndpointType<'/v2/items/123'>) {
  return item.name;
}

type ProductEndpointResponse = EndpointType<'/v2/products?ids=1,2,3'>;
// -> Product[]
```

## Installation

```sh
npm i @brickninjaapi/types
```

## Contributing

See [parent readme](../../README.md#contributing).

## License

Licensed under the [MIT License](./LICENSE).
