import { MaterialComponetnModule } from './material-componetn.module';

describe('MaterialComponetnModule', () => {
  let materialComponetnModule: MaterialComponetnModule;

  beforeEach(() => {
    materialComponetnModule = new MaterialComponetnModule();
  });

  it('should create an instance', () => {
    expect(materialComponetnModule).toBeTruthy();
  });
});
