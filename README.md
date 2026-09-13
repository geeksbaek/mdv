# 한지 (mdv)

CJK 강조가 깨지지 않는 마크다운 뷰어입니다. 글꼴·행간·본문 폭 같은 조판 설정을 링크로 함께 공유합니다.

## 개발

```
npm install
npm run dev        # http://localhost:8080
npm test
npm run typecheck
npm run build
```

## 배포 (Vercel)

`main` 브랜치에 푸시하면 GitHub Actions(`.github/workflows/vercel-deploy.yml`)가 Vercel CLI로 프로덕션 배포합니다.

- 저장소 시크릿 `VERCEL_TOKEN`이 필요합니다 (Settings → Secrets and variables → Actions).
- 첫 실행 때 토큰 계정 아래에 `mdv` 프로젝트가 자동 생성됩니다.
- 공유 링크를 영구 저장하려면 Vercel 프로젝트 환경 변수에 Postgres 주소 `DATABASE_URL`을 넣으세요. 없으면 서버 메모리에만 저장됩니다.
- 저장소 변수 `VERCEL_DEPLOY_DISABLED=true`를 두면 배포를 잠시 끌 수 있습니다.

## 로그인과 기기 간 동기화

"내 문서"는 기본적으로 브라우저(IndexedDB)에만 저장됩니다. Google 또는 Apple로 로그인하면 문서가 계정에 묶여 다른 기기에서도 열립니다(최신 수정본 우선, 삭제는 다른 기기에도 전파).

배포 환경에서 로그인을 켜려면 Vercel 프로젝트 환경 변수에 다음을 설정한 뒤, GitHub 저장소 변수 `VITE_AUTH_ENABLED`를 `true`로 두고 다시 배포합니다.

| 변수 | 설명 |
| --- | --- |
| `DATABASE_URL` | Postgres 연결 문자열 (예: Neon). 사용자, 세션, 문서가 저장됩니다. 빌드 시 `migrations/*.sql`이 적용됩니다. |
| `BETTER_AUTH_SECRET` | 세션 서명 비밀 키. 32자 이상 임의 문자열. |
| `BETTER_AUTH_URL` | 배포 주소 (예: `https://mdv-weld.vercel.app`). |
| `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET` | Google Cloud Console → OAuth 클라이언트(웹). 승인된 리디렉션 URI: `https://<도메인>/api/auth/callback/google` |
| `APPLE_CLIENT_ID`, `APPLE_CLIENT_SECRET` | Apple Developer → Services ID와, 키(.p8)로 생성한 클라이언트 시크릿 JWT. Return URL: `https://<도메인>/api/auth/callback/apple` |
| `APPLE_APP_BUNDLE_IDENTIFIER` | (선택) 네이티브 앱 번들 ID. |

Google만 쓰려면 Apple 변수를 비워 두고 저장소 변수 `VITE_AUTH_PROVIDERS`를 `google`로 설정하면 버튼도 Google만 표시됩니다.

## 얼굴 따라 회전

전면 카메라로 얼굴 기울기를 읽어 미리보기를 눈높이에 맞춥니다. 영상은 기기 안에서만 처리됩니다. 모델과 WASM은 앱에 포함되어 있어 외부 CDN에 의존하지 않습니다.
