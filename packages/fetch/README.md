# `@brickninjaapi/fetch`

This package provides a tiny wrapper around native fetch to call the Brick Ninja API that returns typesafe responses.

## Usage

```ts
import { fetchBrickNinjaApi } from '@brickninjaapi/fetch';

const item = await fetchBrickNinjaApi('/v1/items/1234');
// -> { id: number, name: string, ... }
```

## Installation

```sh
npm i @brickninjaapi/fetch
```

## Contributing

See [parent readme](../../README.md#contributing).

## License

Licensed under the [MIT License](./LICENSE).