import { addViewToListingRoute } from './addViewToListing';
import { getAllListingsRoute } from './getAllListings';
import { getListingRoute } from './getListing';
import { getUserListingsRoute } from './getUserListings';
import { createNewListingRoute } from './createNewListing';
import { updateListingRoute } from './updateListing';
import { deleteListingRoute } from './deleteListing';
import { staticFilesRoute, filesRoutes } from './files';

export default [
    addViewToListingRoute,
    getAllListingsRoute,
    getListingRoute,
    getUserListingsRoute,
    createNewListingRoute,
    updateListingRoute,
    deleteListingRoute,
    staticFilesRoute,
    ...filesRoutes
];
