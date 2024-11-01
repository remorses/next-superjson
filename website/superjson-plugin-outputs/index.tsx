import { withSuperJSONPage as _withSuperJSONPage } from "next-superjson-plugin/tools";
import { withSuperJSONProps as _withSuperJSONProps } from "next-superjson-plugin/tools";
function Home(param) {
    var date = param.date;
    // useEffect(() => {
    //     apiCall({})
    // }, [])
    return /*#__PURE__*/ React.createElement("div", null, /*#__PURE__*/ React.createElement("p", null, "Hello World"), /*#__PURE__*/ React.createElement("p", null, date.toISOString()));
}
export var getStaticProps = _withSuperJSONProps(function() {
    return {
        props: {
            date: new Date()
        }
    };
}, []);
export default _withSuperJSONPage(Home);
