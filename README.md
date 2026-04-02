# Kyle's Japan Life 🇯🇵

A bilingual (English/Japanese) personal blog about life, travel, and language learning in Japan. Built from scratch as a full-stack personal project after outgrowing a WordPress setup — designed to be fully self-managed with zero hosting costs.

🌐 **Live site:** [kylesjapan.life](https://kylesjapan.life)

---

## ✨ Features

- 🌍 **Bilingual support** — Full English and Japanese content, with DeepL API integration for translation
- 📝 **MDX-based article system** — Write posts in Markdown with embedded React components
- 💬 **Nested comment & reply system** — Built on Supabase with full threading support
- 🏷️ **Tag filtering** — Browse articles by category/tag
- ⏱️ **Reading time estimates** — Auto-calculated per article
- 🖼️ **Image lightbox** — Smooth image viewing via `yet-another-react-lightbox`
- 🚀 **Image optimization** — Next.js Image component for fast load times
- 📧 **Newsletter** — Email subscription with regular dispatches to subscribers
- ☁️ **Zero cost hosting** — Deployed via Cloudflare, no monthly fees

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Database | Supabase (PostgreSQL) |
| Content | MDX |
| Styling | Tailwind CSS |
| Deployment | Cloudflare Pages |
| Translation | DeepL API |
| Image Lightbox | yet-another-react-lightbox |

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- A Supabase account
- A Cloudflare account
- DeepL API key (free tier works)

### Installation

```bash
git clone https://github.com/yourusername/kylesjapan.life.git
cd kylesjapan.life
npm install
```

### Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
DEEPL_API_KEY=your_deepl_api_key
```

### Run Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📁 Project Structure

```
├── app/                  # Next.js App Router pages
│   ├── [lang]/           # Bilingual routing (en/ja)
│   ├── blog/             # Blog article pages
│   └── api/              # API routes
├── components/           # Reusable React components
│   ├── comments/         # Nested comment system
│   ├── lightbox/         # Image lightbox
│   └── newsletter/       # Newsletter signup
├── content/              # MDX blog posts
│   ├── en/               # English articles
│   └── ja/               # Japanese articles
├── lib/                  # Utility functions
│   ├── supabase.ts       # Supabase client
│   └── mdx.ts            # MDX processing
└── public/               # Static assets
```

---

## 🗄️ Database Schema (Supabase)

### Comments Table

```sql
create table comments (
  id uuid default gen_random_uuid() primary key,
  post_slug text not null,
  author_name text not null,
  content text not null,
  parent_id uuid references comments(id),
  created_at timestamp with time zone default now()
);
```

---

## 🌐 Deployment

This site is deployed on **Cloudflare Pages** with zero monthly cost.

```bash
npm run build
```

Cloudflare Pages automatically deploys on push to the `main` branch.

---

## 📖 About the Project

This blog started as a WordPress site when I first moved to Japan in 2022. After transitioning into IT and teaching myself web development, I rebuilt it entirely from scratch — handling everything from design to deployment myself.

The goal was simple: full ownership and control, zero ongoing costs, and a real production project to build on.

Topics covered:
- 🗾 Life in Japan as an American
- 🗣️ Japanese language learning (JLPT journey to N1)
- ✈️ Travel around Japan and Asia
- 🏯 Japanese culture and daily life

---

## 📬 Newsletter

The blog has an active newsletter. Subscribe at [kylesjapan.life](https://kylesjapan.life) to get updates directly in your inbox.

## 📄 License

All rights reserved. This repository is public for portfolio purposes only. 
Please do not copy, reuse, or redistribute any part of this codebase without permission.
---

---

# Kyle's Japan Life 🇯🇵（日本語版）

日本での生活、旅行、語学学習をテーマにしたバイリンガル個人ブログです。WordPressからの脱却を機に、フルスタックの個人プロジェクトとしてゼロから構築しました。ホスティングコストをかけずに完全自己管理できる仕組みを目指して設計しています。

🌐 **サイト:** [kylesjapan.life](https://kylesjapan.life)

---

## ✨ 機能一覧

- 🌍 **バイリンガル対応** — 日英完全対応コンテンツ。DeepL API による翻訳機能を統合
- 📝 **MDXベースの記事管理** — Markdownで記事を書きながらReactコンポーネントも埋め込み可能
- 💬 **ネスト型コメント・返信システム** — Supabaseをベースにしたスレッド機能付きコメント
- 🏷️ **タグフィルタリング** — カテゴリ・タグで記事を絞り込み
- ⏱️ **読了時間の自動計算** — 記事ごとに読了時間を自動表示
- 🖼️ **画像ライトボックス** — yet-another-react-lightbox によるスムーズな画像表示
- 🚀 **画像最適化** — Next.js Image コンポーネントによる高速ロード
- 📧 **ニュースレター** — メール購読機能。定期的に読者へ配信
- ☁️ **ゼロコストホスティング** — Cloudflare Pages でデプロイ。月額費用なし

---

## 🛠️ 技術スタック

| レイヤー | 技術 |
|---|---|
| フレームワーク | Next.js 14 (App Router) |
| 言語 | TypeScript |
| データベース | Supabase (PostgreSQL) |
| コンテンツ | MDX |
| スタイリング | Tailwind CSS |
| デプロイ | Cloudflare Pages |
| 翻訳 | DeepL API |
| 画像ライトボックス | yet-another-react-lightbox |

---

## 🚀 ローカル環境での起動

### 必要環境

- Node.js 18以上
- Supabaseアカウント
- Cloudflareアカウント
- DeepL APIキー（無料プランで動作）

### インストール

```bash
git clone https://github.com/yourusername/kylesjapan.life.git
cd kylesjapan.life
npm install
```

### 環境変数

ルートディレクトリに `.env.local` ファイルを作成してください。

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
DEEPL_API_KEY=your_deepl_api_key
```

### 開発サーバー起動

```bash
npm run dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開いてください。

---

## 📁 プロジェクト構成

```
├── app/                  # Next.js App Router ページ
│   ├── [lang]/           # バイリンガルルーティング (en/ja)
│   ├── blog/             # ブログ記事ページ
│   └── api/              # APIルート
├── components/           # 再利用可能なReactコンポーネント
│   ├── comments/         # ネスト型コメントシステム
│   ├── lightbox/         # 画像ライトボックス
│   └── newsletter/       # ニュースレター登録
├── content/              # MDXブログ記事
│   ├── en/               # 英語記事
│   └── ja/               # 日本語記事
├── lib/                  # ユーティリティ関数
│   ├── supabase.ts       # Supabaseクライアント
│   └── mdx.ts            # MDX処理
└── public/               # 静的アセット
```

---

## 🗄️ データベーススキーマ (Supabase)

### コメントテーブル

```sql
create table comments (
  id uuid default gen_random_uuid() primary key,
  post_slug text not null,
  author_name text not null,
  content text not null,
  parent_id uuid references comments(id),
  created_at timestamp with time zone default now()
);
```

---

## 🌐 デプロイ

**Cloudflare Pages** にデプロイしており、月額費用はゼロです。

```bash
npm run build
```

`main` ブランチへのプッシュで Cloudflare Pages が自動デプロイします。

---

## 📖 プロジェクトについて

このブログは2022年に日本へ移住した際、WordPressでスタートしました。その後IT業界に転職し、独学でWeb開発を学ぶ中で、全てをゼロから作り直しました。設計からデプロイまで全て自分一人で担当しています。

目標はシンプルでした。完全な自己管理、ランニングコストゼロ、そして本番環境で動く本物のプロジェクトを持つこと。

扱っているテーマ:
- 🗾 アメリカ人として見る日本での生活
- 🗣️ 日本語学習の記録（JLPT N1取得まで）
- ✈️ 日本国内・アジアへの旅行
- 🏯 日本文化と日常生活

---

## 📬 ニュースレター

ブログではニュースレターを定期配信しています。[kylesjapan.life](https://kylesjapan.life) から購読できます。

---

## 📄 ライセンス

全著作権所有。このリポジトリはポートフォリオ目的で公開しています。許可なくコードの複製、再利用、再配布はご遠慮ください。

---

