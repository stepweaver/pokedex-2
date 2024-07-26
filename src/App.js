import React from 'react';
import Components from './Components/Components';
import * as ENV from './environments';
import Parse from 'parse';
import './index.css';

Parse.initialize(ENV.APPLICATION_ID, ENV.JAVASCRIPT_KEY);
Parse.serverURL = ENV.SERVER_URL;
Parse.liveQueryServerURL = ENV.LIVEQUERY_SERVER_URL;

const liveQueryClient = new Parse.LiveQueryClient({
  applicationId: ENV.APPLICATION_ID,
  serverURL: ENV.LIVEQUERY_SERVER_URL,
  javascriptKey: ENV.JAVASCRIPT_KEY
});

liveQueryClient.open();

const App = () => {
  return (
    <div>
      <Components />
    </div>
  );
}

export default App;