WebExtCanvasInfo = (() => {

   let E_OVERLAY;

   function ensure_overlay() {
      if (!E_OVERLAY) {
         E_OVERLAY = document.createElement('pre');
         E_OVERLAY.style.position = 'fixed';
         E_OVERLAY.style.textShadow = '0px 0px 4px #FFF';
         E_OVERLAY.style.top = '0px';
         E_OVERLAY.style.left = '0px';
         E_OVERLAY.style.margin = '4px';
         E_OVERLAY.style.zIndex = '1000000';
         E_OVERLAY.textContent = 'Canvases:';
         document.body.appendChild(E_OVERLAY);
      }
      return E_OVERLAY;
   }

   // -

   function log() {
      console.log(`[WebCanvasCanvasInfo@${window.origin}] `, ...arguments);
   }

   let NEXT_ID = 1;

   // -

   log(`Injecting for`, window.location);

   const was = HTMLCanvasElement.prototype.getContext;
   HTMLCanvasElement.prototype.getContext = function(type) {
      let ret = was.apply(this, arguments);
      if (!ret) return ret;
      if (!this._weci_elem) {
         const elem = this._weci_elem = document.createElement('div');
         elem.id = NEXT_ID;
         NEXT_ID += 1;

         const line = `#${elem.id}: ${type}`;
         log(`+ `, line);
         elem.textContent = line;

         const overlay = ensure_overlay();
         overlay.appendChild(elem);
      }
      return ret;
   };

   return {
      overlay: ensure_overlay,
   };
})();
