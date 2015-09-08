# crx-adblock

- chrome web browser extension
- hide/block/remove custom forceful banners from any webpage
- add rules in rules.json


# installation

- follow similiar instruction as [this](https://github.com/adhocore/crx-joom/blob/master/README.md#how) but remember to use name `crx-adblock`


# rules (how-to)

```json
"hostname": {
	"query":[".selector1,.selector2", "#selector3"],
	"call": "some callback function name"
}
```
