# announce role bot
アナウンス用のロールを付与するためのbot


## 初期設定
1. discord bot のトークンを取得(botはサーバーにまだ招待しないように)
2. `npm install`を実行
3. configディレクトリ内のsetting.jsonの`MAIN_TOKEN`にトークンを設定
4. `node main`を実行
5. botに以下の権限を設定して招待する
- Manege Roles 
- View Channel
- Manege Messages
- Read Message History
- Add Reactions

6. `/help`をサーバーで実行し、正常に動作しているか確認(エラーが出た場合は作者まで)

## ロールの追加・削除
- ロールを追加<br>
サーバの任意のチャンネルで、 `arb role add <ロールの名前> <カラーコード>`と実行<br>
既存のロールの下に追加します。カラーコードは16進数のものを指定してください。省略した場合、無色として設定されます。
- ロールを削除
サーバの任意のチャンネルで、`arb role delete <ロールの名前> `と実行<br>
ロールを削除します。
- configを直接編集<br>
config/guildディレクトリ内guild.jsonのrolesにサーバー側で設定した付与したいロールを以下の要領で列挙。**設定後再起動またはリロード必須**。
```json
{
    "roles" :[
            [" ロールの名前(英数字) "," ロールのid "],["sample","123456789"],["ex","987654321"]]      
}
```

## その他設定
- prefix変更<br>
configディレクトリ内のsetting.jsonの`prefix`を任意の記号に変更
- アナウンスロール追加<br>
configディレクトリ内のroles.jsonにサーバー側で設定した付与したいロールを`ロールの追加、削除 - configを直接編集`を参考に追加
- アナウンスロール削除<br>
configディレクトリ内のroles.jsonで削除したいロールの配列を削除<br>
(**これより上の設定はファイル保存後再起動、またはdiscordで`arb reload`が必要**)<br>
<br>

- adminユーザーを追加<br>
サーバの任意のチャンネルで、`arb admin add <追加したいユーザーをメンション>`と実行
- adminユーザーを削除<br>
サーバの任意のチャンネルで、`arb admin delete <削除したいユーザーをメンション>`と実行


## コマンド一覧
- `panel` ロールの付与パネルを表示(短縮: `pa`)
- `an <ロールの名前> on/off` ロールの名前に該当するロールを付与(on)か、削除(off)
- `help` ヘルプを表示します<br>
<br>

`arb`から始まるコマンドはAdminに入っているユーザーのみ操作可能
- `arb admin` adminを追加、削除(その他設定を参考)
- `arb role` ロールを追加、削除(ロールの追加、削除を参考)
- `arb reload` コンフィグをリロード

## discord api仕様変更について
discord apiの仕様変更により、2020年10月7日より特権とマークされた情報へのアクセスが制限されます。<br>
それに伴い、特権へのアクセスに申請(機能をオン)しないと起動時にエラーが出ます。<br>
必ず[Developer Portal](https://discord.com/developers/applications)からPrivileged Intentsを有効化してください。<br>
![discord-div-Privileged_Intents.png](https://github.com/huda0209/resource/blob/master/discord-bot-template/discord-div-Privileged_Intents.png)<br>
赤枠内のチェックボタンをオンにする<br>


## 作成者
- [huda0209](https://github.com/huda0209)