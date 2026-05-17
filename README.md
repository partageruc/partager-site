# PARTAGER UN CADEAU — 公式サイト

宝塚・逆瀬川の焼き菓子店「PARTAGER UN CADEAU」の静的サイト。
ピュアな HTML / CSS / JS で動作し、ビルドは不要。

公開予定 URL: https://partageruc.github.io/partager-site/

## ディレクトリ構成

```
partager-site/
├── index.html              トップページ（ヒーロー + 3列商品グリッド + ストアティーザー）
├── about.html              お裾分けコンセプト + 6素材紹介
├── gateaux.html            カテゴリ別の横スクロールスライダー（4カテゴリ）
├── shop.html               店舗情報 + Google Maps
├── contact.html            Formspree 問い合わせフォーム + Instagram
├── products/               商品個別ページ 16 点
│   ├── financier-beurre.html
│   ├── financier-osusowake.html
│   └── ... (全16ファイル)
├── assets/
│   ├── css/style.css       全ページ共通の単一CSS
│   ├── fonts/medio.otf     Medio フォント本体
│   ├── images/
│   │   ├── logo.png        ヘッダーロゴ
│   │   ├── hero.jpg        ヒーロー背景（未追加。差し替えで自動反映）
│   │   └── products/       商品写真用（未追加）
│   └── js/main.js          メニュー開閉 + reveal アニメ + 年表示
├── original/               リファクタ前 v4 HTML（参考用、デプロイ対象外）
└── README.md               これ
```

## ローカルで開く

そのまま `index.html` をブラウザで開いても動きますが、フォントやCSSの相対パス確認のため
簡易サーバ経由が確実です：

```powershell
# プロジェクトのルートで
python -m http.server 8000
# → http://localhost:8000/ をブラウザで開く
```

## 編集ポイント

### 文言を変更したい
- 各 `.html` の `<main>` 内を直接編集
- 共通の枠（ヘッダー・フッター・ナビ）は各ファイルに記述されているので、
  すべてのページで同じ修正を行う必要あり（ファイル横断置換が安全）

### スタイルを変更したい
- `assets/css/style.css` を編集すれば全ページに反映
- カラー変数は `:root` 内に集約済み

### 商品を追加したい
1. `products/` に新しい `.html` を作る（既存ファイルをコピーして書き換えるのが早い）
2. `index.html` の `.home-grid` に1枚タイル追加
3. `gateaux.html` の該当カテゴリ `.slider` にスライド追加

### 商品写真を追加したい
- 各商品ページの `<div class="product-page__placeholder">商品名</div>` を
  `<img src="../assets/images/products/financier-beurre.jpg" alt="...">` に置き換え
- ホームグリッド / スライダーも同様に `.home-grid__placeholder` → `<img>` で置換可能

### Formspree フォームを有効化
- `contact.html` の `action="https://formspree.io/f/YOUR_FORM_ID"` を
  実際の Form ID に置き換え

### Hero に店舗写真を入れたい
- `index.html` の `<section class="hero">` 内に
  `<img src="assets/images/hero.jpg" alt="">` を `.hero__text` の前に挿入

## アクセント記号「â」の処理

Medio フォントには `â` のグリフがあるが位置とサイズが他文字と合わないため、
すべての `gâteaux` 表記で `g<span class="acc">a</span>teaux` という構造にして、
CSS で `^` を `a` の上に重ねている（`.gateaux .acc::after`）。

同様の問題が起きるアクセント記号（é / è / à）が必要になった場合は同じテクニックを
使うか、その箇所だけ画像書き出しで対応。

## デプロイ（GitHub Pages）

```powershell
# 初回のみ
git init
git remote add origin https://github.com/partageruc/partager-site.git

# 通常の更新
git add .
git commit -m "更新内容"
git push origin main
```

GitHub リポジトリの Settings → Pages で
`Branch: main / (root)` を選択すると公開される。

## 連絡先

- Instagram: [@partager_uc](https://www.instagram.com/partager_uc/)
- Online Shop (BASE): [partager.theshop.jp](https://partager.theshop.jp)
- 店舗: 兵庫県宝塚市中州1-2-12（阪急逆瀬川駅東口徒歩3分）
