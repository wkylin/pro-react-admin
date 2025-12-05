## v2.2.0 标签推送记录

本记录描述了 v2.2.0 标签在本地确认并推送到远端的完整命令与说明，便于后续审计与参考。

### 前置说明

- 当前分支：`main`
- 工作区：干净（无未提交变更）
- 标签类型：带注释标签（annotated tag）

### 操作步骤与命令

1. 检查工作区状态

```bash
git status -sb
```

- 确认无未提交改动，确保基于干净的工作区打标签/推送。

2. 确认本地是否已存在目标标签

```bash
git tag -l "v2.2.0"
```

- 若已存在需先确认指向是否正确，再决定是否重建或直接推送。

3. 查看 HEAD 提交哈希

```bash
git rev-parse HEAD
```

- 用于对齐标签应指向的提交。

4. 查看标签指向的提交哈希

```bash
git rev-parse v2.2.0
```

- 比对步骤 3 和步骤 4，确认标签已指向当前 HEAD。

5. 检查远端是否已有同名标签

```bash
git ls-remote --tags origin v2.2.0
```

- 若输出为空，表示远端尚无该标签，可安全推送。

6. 确认标签对象类型（确保是 annotated tag）

```bash
git cat-file -t v2.2.0
```

- 输出应为 `tag`，表示为带注释标签（非轻量标签）。

7. 查看标签详情与提交信息

```bash
git show v2.2.0 --no-patch --pretty=fuller
```

- 验证标签的 tagger、时间、注释信息（此处为 `chore(release): 2.2.0`）及其指向的提交。

8. 推送标签到远端

```bash
git push origin v2.2.0
```

- 成功后远端将新增该标签，可在仓库 Releases/Tags 查看。

### 结果

- 标签 `v2.2.0` 已存在本地且指向当前 `HEAD`，并成功推送到 `origin`。
- 远端现有同名标签，可用于发布或生成变更日志。

### 后续可选动作

- 如需生成对应版本的 changelog：

```bash
npx conventional-changelog -p angular -i CHANGELOG.md -s -r 0
```

- 如需在 GitHub 上创建 release，直接基于 `v2.2.0` 标签填入发布说明。
