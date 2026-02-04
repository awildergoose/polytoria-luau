# polytoria-luau

This project supplies Luau type definitions for Polytoria.

## Compiling

Simply use `bun compile` to compile the TypeScript types in `types` into Luau type definitions. The compiler can be found in the `compiler` folder. The output of the compiler goes into `generated/generated.d.ts`

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
