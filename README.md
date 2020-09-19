# announce role bot
アナウンス用のロールを付与するためのbot


## 初期設定
1. 機能を使いたいサーバーで、アナウンス用(ユーザーに付与したい)のロールを設定
2. discord bot のトークンを取得(botはサーバーにまだ招待しないように)
3. `npm install`を実行
4. configディレクトリ内のsetting.jsonの`MAIN_TOKEN`にトークンを設定
5. configディレクトリ内のroles.jsonにサーバー側で設定した付与したいロールを以下の要領で列挙
```
{
    "roles" :[
            [" ロールの名前(英数字) "," ロールのid "],["sample","123456789"],["ex","987654321"]
    ]      
}
```
- ロールの名前の部分は、好きな名前を英数字で設定(コマンドの引数や、helpの表示にそのまま使われます)
- ロールのidの部分は、先ほどサーバーで設定したロールのidを設定(idはdiscordの個人設定のテーマより、開発者モードを有効にし、ロールを右クリック)

6. `node main`を実行
7. botに以下の権限を設定して招待する
- Manege Roles 
- View Channel
- Manege Messages
- Read Message History
- Add Reactions

8. `/help`をサーバーで実行し、正常に動作しているか確認(エラーが出た場合は下記連絡先まで)


## その他設定
- prefix変更 configディレクトリ内のsetting.jsonの`prefix`を任意の記号に変更
- アナウンスロール追加 configディレクトリ内のroles.jsonにサーバー側で設定した付与したいロールを上記初期設定の5番を参考に追加
- アナウンスロール削除 configディレクトリ内のroles.jsonで削除したいロールの配列を削除
(これより上の設定はファイル保存後再起動が必要)

- adminユーザーを追加　サーバの任意のチャンネルで、`admin add <追加したいユーザーをメンション>`と実行
- adminユーザーを削除　サーバの任意のチャンネルで、`admin remove <削除したいユーザーをメンション>`と実行


## コマンド一覧
- `panel` ロールの付与パネルを表示(短縮: `pa`)
- `an <ロールの名前> on/off` ロールの名前に該当するロールを付与(on)か、削除(off)
- `help` ヘルプを表示します
- `admin` adminを追加、削除(その他設定を参考)


## 作成者
- [huda0209](https://github.com/huda0209)