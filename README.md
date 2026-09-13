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

## 얼굴 따라 회전

전면 카메라로 얼굴 기울기를 읽어 미리보기를 눈높이에 맞춥니다. 영상은 기기 안에서만 처리됩니다. 모델과 WASM은 앱에 포함되어 있어 외부 CDN에 의존하지 않습니다.
