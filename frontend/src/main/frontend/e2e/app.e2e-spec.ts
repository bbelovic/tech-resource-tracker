import { DummyPage } from './app.po';

import { DockerComposeEnvironment, StartedDockerComposeEnvironment } from "testcontainers";
const path = require("path");


describe('dummy App', () => {
  let page: DummyPage;
  let environment: StartedDockerComposeEnvironment;

  beforeAll( () => {
    const composeFilePath = path.resolve(__dirname, "../../../../..");
    const composeFile = "docker-compose.yml";

    console.log("Current dir: " + __dirname);
    console.log("Compose file: "+ composeFilePath);
    //environment = await new DockerComposeEnvironment(composeFilePath, composeFile).up();

    // let tracker = environment.getContainer("tech-resource-tracker-be_1");
    console.log("xxx");
    // console.log("host: " + tracker.getHost() );

    
  });

  
  beforeEach(() => {
    page = new DummyPage();
  });


  it('should display message saying app works',() => {
     page.navigateTo();

    //console.log('in test');
    const text = page.getParagraphText();
    expect(text).toEqual('Tech resource tracker');
    //page.getParagraphText().then(text => expect(text).toEqual('Tech resource tracker'));

  });

 /* afterAll(async () => {
    await environment.down();
  });*/
});
