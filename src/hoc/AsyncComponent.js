/**
 * File not in use as we have `React.lazy`
 */
import React, { Component } from "react";


 function AsyncComponent(getComponent) {

    class AsyncComponent extends Component {
        // static Component = null;
        state = { Component: AsyncComponent.Component };

        componentWillMount() {
            if (!this.state.Component) {
                getComponent().then(component => {
                    // AsyncComponent.Component = component.default;
                    this.setState({ Component: component.default })
                })
            }
        }
        render() {
            const { Component } = this.state
            if (Component) {
                return <Component {...this.props} />
            }
            return null
        }
    }
    return AsyncComponent;
}

export default AsyncComponent;