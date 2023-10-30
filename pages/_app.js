// import node module libraries
import Head from 'next/head';
import { useRouter } from 'next/router'
import { NextSeo } from 'next-seo'
import SSRProvider from 'react-bootstrap/SSRProvider';

// import provider and store from redux state management.
import { Provider } from 'react-redux'
import { store } from 'store/store'

// import theme style scss file
import 'styles/theme.scss';

// import default layouts
import DefaultMarketingLayout from 'layouts/marketing/DefaultLayout';
import DefaultDashboardLayout from 'layouts/dashboard/DashboardIndex';

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const pageURL = process.env.baseURL + router.pathname;
  const title = "Geeks UI - Nextjs fully responsive template ";
  const description = "Geeks is a fully responsive and yet modern premium Nextjs template & snippets. Geek is feature-rich Nextjs components and beautifully designed pages that help you create the best possible website and web application projects. Nextjs Snippet "
  const keywords = "Geeks UI, Nextjs, Next.js, Course, Sass, landing, Marketing, admin themes, Nextjs admin, Nextjs dashboard, ui kit, web app, multipurpose"

  // Identify the layout, which will be applied conditionally
  const Layout = Component.Layout || (router.pathname.includes('dashboard') ? (router.pathname.includes('instructor') || router.pathname.includes('student') ? DefaultMarketingLayout : DefaultDashboardLayout) : DefaultMarketingLayout)
  
  return (
    <SSRProvider>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="keywords" content={keywords} />
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
      </Head>
      <NextSeo
        title={title}
        description={description}
        canonical={pageURL}
        openGraph={{
          url: pageURL,
          title: title,
          description: description,
          site_name: process.env.siteName,
          images: [
            {
              url: '/images/og/geeks-ui-next-js-default-og-image.jpg',
              width: 1200,
              height: 630,
              alt: 'Geeks UI NextJS',
            },
          ],
        }}
      />
      <Provider store={store}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </SSRProvider>
  )
}

export default MyApp
