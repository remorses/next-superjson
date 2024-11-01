import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { withSuperJSONPage as _withSuperJSONPage } from "next-superjson-plugin/tools";
import { withSuperJSONProps as _withSuperJSONProps } from "next-superjson-plugin/tools";
import { useEffect } from 'react';
function Home({ date }) {
    useEffect(()=>{
        fetch('/api/api').then((res)=>res.json()).catch((err)=>console.error(err));
    }, []);
    return /*#__PURE__*/ _jsxs("div", {
        children: [
            /*#__PURE__*/ _jsx("p", {
                children: "Hello World"
            }),
            /*#__PURE__*/ _jsx("p", {
                children: date.toISOString()
            })
        ]
    });
}
export const getStaticProps = _withSuperJSONProps(function() {
    return {
        props: {
            date: new Date()
        }
    };
}, []);
export default _withSuperJSONPage(Home);
