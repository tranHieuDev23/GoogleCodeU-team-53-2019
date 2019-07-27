import { Marker } from "google-maps-react";

class CustomMarker extends Marker {
    shouldComponentUpdate(nextProps) {
        if (nextProps.key === this.props.key)
            return false;
        return true;
    }
};

export default CustomMarker;