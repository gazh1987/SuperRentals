import DS from 'ember-data';

//Default App to make requests to the namespace of /api.
export default DS.JSONAPIAdapter.extend({
    namespace: 'api'
});
