import { IntuitiveVisualizaionCliPage } from './app.po';

describe('intuitive-visualizaion-cli App', () => {
  let page: IntuitiveVisualizaionCliPage;

  beforeEach(() => {
    page = new IntuitiveVisualizaionCliPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
