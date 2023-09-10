# Image processing API

## List all file name
-  santamonica
-  palmtunnel
-  icelandwaterfall
-  fjord
-  encenadaport
## API Reference
#### Resize image by on-demand

```http
  GET /api/images/?filename={filename}&width={width}&height={height}
```

| Parameter  | Type     | Description                                             |
| :--------- | :------- | :------------------------------------------------------ |
| `filename` | `string` | **Required**. name of image to be resized               |
| `width`    | `number` | **Required**. width of thumb image                      |
| `height`   | `number` | **Required**. height of thumb image                     |

### Functionality

-   This will create a thumb version of the image (if it does not exist already)
-   If you change the height or width parameter it will recreate the image
-   Futhermore it will be delivered as the response to the client

## Scripts

Run prettier

```bash
  npm run format
```

Run lint

```bash
  npm run lint
```

Run tests

```bash
  npm run test
```

Start on dev env

```bash
  npm run dev
```

Build project

```bash
  npm run build
```

Run application with prd

```bash
  npm run start
```

## Run Locally

Clone the project

```bash
  https://github.com/chientd-fuis/udacity-js-project-1.git
```

Go to the project directory

```bash
  cd udacity-js-project-1
```

Install dependencies

```bash
  npm i
```

Start the dev server

```bash
  npm run dev
```

## Running Tests

To run tests

```bash
  npm run test
```

## Author
ChienTD
