import {
  IRenderMime
} from '@jupyterlab/rendermime-interfaces';

import {
  Widget
} from '@phosphor/widgets';


/**
 * The default mime type for the extension.
 */
const MIME_TYPE = 'application/x-hdf5';


/**
 * The class name added to the extension.
 */
const CLASS_NAME = 'jp-OutputWidgetHDF5';


/**
 * A widget for rendering HDF5.
 */
export
class OutputWidget extends Widget implements IRenderMime.IRenderer {
  /**
   * Construct a new output widget.
   */
  constructor(options: IRenderMime.IRendererOptions) {
    super();
    this._mimeType = options.mimeType;
    this.addClass(CLASS_NAME);
  }

  /**
   * Render HDF5 into this widget's node.
   */
  renderModel(model: IRenderMime.IMimeModel): Promise<void> {
    console.log('model');
    console.log(model);
    this.node.textContent = JSON.stringify(model.data[this._mimeType]);
    return Promise.resolve(void 0);
  }

  private _mimeType: string;
}


/**
 * A mime renderer factory for HDF5 data.
 */
export
const rendererFactory: IRenderMime.IRendererFactory = {
  safe: true,
  mimeTypes: [MIME_TYPE],
  createRenderer: options => new OutputWidget(options)
};


const extension: IRenderMime.IExtension = {
  name: 'HDF5',
  rendererFactory,
  rank: 0,
  dataType: 'string'
};

export default extension;

