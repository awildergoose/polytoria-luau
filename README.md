# polytoria-luau

This project supplies Luau type definitions for Polytoria.

## Compiling

Simply use `bun generate` to generates types into Luau type definitions. The generator can be found in the `generator` folder. The output of the generator goes into `generated/generated.d.luau`

## Usage

In your preferences on Visual Studio Code:

```json
{
	"luau-lsp.types.definitionFiles": {
		"@polytoria": "path/to/polytoria-luau/generated/generated.d.luau"
	},
	"luau-lsp.platform.type": "standard",
	"luau-lsp.types.documentationFiles": []
}
```

This should be enough to get the type definitions working.
