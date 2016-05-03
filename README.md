```sh
jq '. | select (.administrator != true)' users.json > non-admin-users.json
```

```sh
jq '. | select (.administrator != true) | .id' users.json > non-admin-users-id.json
```
