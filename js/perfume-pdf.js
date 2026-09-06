/**
 * ============================================================
 * HIMHERBAL - PREMIUM PERFUME PDF VIEWER
 * ============================================================
 *
 * Features:
 * - Full-screen PDF pages
 * - Horizontal left/right scrolling
 * - Next = page moves right -> left
 * - Previous = page moves left -> right
 * - Arrow navigation
 * - Touch swipe
 * - Keyboard navigation
 * - Page dots
 * - Page counter
 * - Responsive
 * - Retina/high-DPI rendering
 *
 * PDF:
 * assets/pdf/premium-perfume-collection.pdf
 * ============================================================
 */

(function () {
  "use strict";

  const PDF_URL =
    "assets/pdf/premium-perfume-collection.pdf";

  let pdf = null;
  let currentPage = 1;
  let totalPages = 0;

  let isRendering = false;
  let pendingPage = null;

  let pdfWindow = null;
  let track = null;

  let prevBtn = null;
  let nextBtn = null;

  let dotsContainer = null;
  let currentCounter = null;
  let totalCounter = null;

  /*
   * ============================================================
   * INITIALIZE
   * ============================================================
   */

  document.addEventListener(
    "DOMContentLoaded",
    initPDFViewer
  );

  function initPDFViewer() {
    /*
     * Get HTML elements
     */
    pdfWindow = document.getElementById(
      "perfumePdfWindow"
    );

    track = document.getElementById(
      "perfumePdfTrack"
    );

    prevBtn = document.getElementById(
      "perfumePdfPrev"
    );

    nextBtn = document.getElementById(
      "perfumePdfNext"
    );

    dotsContainer = document.getElementById(
      "perfumePdfDots"
    );

    currentCounter = document.getElementById(
      "perfumePdfCurrent"
    );

    totalCounter = document.getElementById(
      "perfumePdfTotal"
    );

    /*
     * Canvas must exist.
     */
    const canvas = document.getElementById(
      "perfumePdfCanvas"
    );

    if (!canvas) {
      console.error(
        "Himherbal PDF: Canvas not found."
      );

      return;
    }

    /*
     * Load PDF.js
     */
    loadPDFJS()
      .then(function () {
        console.log(
          "Himherbal PDF: PDF.js loaded."
        );

        loadPDF();
      })
      .catch(function (error) {
        console.error(
          "Himherbal PDF: PDF.js failed.",
          error
        );

        showError(
          "PDF viewer could not be loaded."
        );
      });

    /*
     * Buttons
     */
    if (prevBtn) {
      prevBtn.addEventListener(
        "click",
        goPrevious
      );
    }

    if (nextBtn) {
      nextBtn.addEventListener(
        "click",
        goNext
      );
    }

    /*
     * Keyboard
     */
    document.addEventListener(
      "keydown",
      handleKeyboard
    );

    /*
     * Touch
     */
    setupTouchNavigation();

    /*
     * Resize
     */
    setupResize();
  }

  /*
   * ============================================================
   * LOAD PDF.JS
   * ============================================================
   */

  function loadPDFJS() {
    return new Promise(function (
      resolve,
      reject
    ) {
      /*
       * PDF.js already loaded
       */
      if (window.pdfjsLib) {
        configureWorker();

        resolve();

        return;
      }

      /*
       * Create PDF.js script
       */
      const script =
        document.createElement("script");

      script.src =
        "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js";

      script.onload = function () {
        if (!window.pdfjsLib) {
          reject(
            new Error(
              "pdfjsLib was not created."
            )
          );

          return;
        }

        configureWorker();

        resolve();
      };

      script.onerror = function () {
        reject(
          new Error(
            "Could not load PDF.js."
          )
        );
      };

      document.head.appendChild(script);
    });
  }

  /*
   * ============================================================
   * PDF WORKER
   * ============================================================
   */

  function configureWorker() {
    window.pdfjsLib.GlobalWorkerOptions.workerSrc =
      "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
  }

  /*
   * ============================================================
   * LOAD PDF
   * ============================================================
   */

  function loadPDF() {
    console.log(
      "Himherbal PDF: Loading:",
      PDF_URL
    );

    window.pdfjsLib
      .getDocument({
        url: PDF_URL,
        withCredentials: false,
      })
      .promise
      .then(function (loadedPDF) {
        pdf = loadedPDF;

        totalPages = pdf.numPages;

        console.log(
          "Himherbal PDF: Loaded."
        );

        console.log(
          "Total pages:",
          totalPages
        );

        /*
         * Update total counter
         */
        if (totalCounter) {
          totalCounter.textContent =
            totalPages;
        }

        /*
         * Build all PDF pages
         */
        return createAllPages();
      })
      .then(function () {
        /*
         * Start at page 1
         */
        currentPage = 1;

        updateCounter();
        updateDots();
        updateButtons();

        /*
         * Make sure slider starts at page 1
         */
        if (pdfWindow) {
          pdfWindow.scrollLeft = 0;
        }
      })
      .catch(function (error) {
        console.error(
          "Himherbal PDF: PDF loading error:",
          error
        );

        showError(
          "Could not load PDF.<br><small>" +
            PDF_URL +
            "</small>"
        );
      });
  }

  /*
   * ============================================================
   * CREATE ALL PAGES
   * ============================================================
   */

  async function createAllPages() {
    if (!pdf || !track) {
      return;
    }

    /*
     * Remove existing content
     */
    track.innerHTML = "";

    /*
     * Create every PDF page
     */
    for (
      let pageNumber = 1;
      pageNumber <= totalPages;
      pageNumber++
    ) {
      const slide =
        document.createElement("div");

      slide.className =
        "perfume-pdf-slide";

      slide.dataset.page =
        pageNumber;

      /*
       * Each page gets its own canvas
       */
      const canvas =
        document.createElement("canvas");

      canvas.className =
        "perfume-pdf-canvas";

      canvas.dataset.page =
        pageNumber;

      /*
       * Create page/card wrapper
       */
      const card =
        document.createElement("div");

      card.className =
        "perfume-pdf-card";

      card.appendChild(canvas);

      slide.appendChild(card);

      track.appendChild(slide);

      /*
       * Render page
       */
      await renderPDFPage(
        pageNumber,
        canvas
      );
    }

    console.log(
      "Himherbal PDF: All pages rendered."
    );
  }

  /*
   * ============================================================
   * RENDER INDIVIDUAL PDF PAGE
   * ============================================================
   */

  async function renderPDFPage(
    pageNumber,
    canvas
  ) {
    try {
      const page =
        await pdf.getPage(pageNumber);

      /*
       * PDF original size
       */
      const originalViewport =
        page.getViewport({
          scale: 1,
        });

      /*
       * FULL SCREEN WIDTH
       *
       * Use viewport width rather than
       * the boxed container width.
       */
      const screenWidth =
        window.innerWidth;

      /*
       * Calculate scale
       */
      const scale =
        screenWidth /
        originalViewport.width;

      const viewport =
        page.getViewport({
          scale: scale,
        });

      /*
       * Retina support
       */
      const outputScale =
        window.devicePixelRatio || 1;

      /*
       * Canvas internal resolution
       */
      canvas.width = Math.floor(
        viewport.width *
          outputScale
      );

      canvas.height = Math.floor(
        viewport.height *
          outputScale
      );

      /*
       * CSS dimensions
       */
      canvas.style.width =
        viewport.width + "px";

      canvas.style.height =
        viewport.height + "px";

      /*
       * Canvas context
       */
      const context =
        canvas.getContext("2d");

      /*
       * Reset transform
       */
      context.setTransform(
        outputScale,
        0,
        0,
        outputScale,
        0,
        0
      );

      /*
       * White page background
       */
      context.save();

      context.fillStyle =
        "#050000";

      context.fillRect(
        0,
        0,
        viewport.width,
        viewport.height
      );

      context.restore();

      /*
       * Render PDF
       */
      await page.render({
        canvasContext: context,
        viewport: viewport,
      }).promise;

      console.log(
        "Rendered page:",
        pageNumber
      );
    } catch (error) {
      console.error(
        "Error rendering page:",
        pageNumber,
        error
      );
    }
  }

  /*
   * ============================================================
   * NEXT PAGE
   * ============================================================
   */

  function goNext() {
    if (!pdfWindow) {
      return;
    }

    if (currentPage >= totalPages) {
      return;
    }

    currentPage++;

    scrollToPage(currentPage);
  }

  /*
   * ============================================================
   * PREVIOUS PAGE
   * ============================================================
   */

  function goPrevious() {
    if (!pdfWindow) {
      return;
    }

    if (currentPage <= 1) {
      return;
    }

    currentPage--;

    scrollToPage(currentPage);
  }

  /*
   * ============================================================
   * SCROLL TO PAGE
   * ============================================================
   */

  function scrollToPage(pageNumber) {
    if (!pdfWindow) {
      return;
    }

    /*
     * Every page = exactly one viewport width
     */
    const target =
      (pageNumber - 1) *
      pdfWindow.clientWidth;

    /*
     * This produces:
     *
     * Page 1 -> Page 2
     * RIGHT -> LEFT
     */
    pdfWindow.scrollTo({
      left: target,
      behavior: "smooth",
    });

    updateCounter();
    updateDots();
    updateButtons();
  }

  /*
   * ============================================================
   * COUNTER
   * ============================================================
   */

  function updateCounter() {
    if (currentCounter) {
      currentCounter.textContent =
        currentPage;
    }

    if (totalCounter) {
      totalCounter.textContent =
        totalPages;
    }
  }

  /*
   * ============================================================
   * BUTTON STATE
   * ============================================================
   */

  function updateButtons() {
    if (prevBtn) {
      prevBtn.disabled =
        currentPage <= 1;
    }

    if (nextBtn) {
      nextBtn.disabled =
        currentPage >= totalPages;
    }
  }

  /*
   * ============================================================
   * CREATE DOTS
   * ============================================================
   */

  function createDots() {
    if (!dotsContainer) {
      return;
    }

    dotsContainer.innerHTML = "";

    /*
     * Create one dot for each page
     */
    for (
      let i = 1;
      i <= totalPages;
      i++
    ) {
      const dot =
        document.createElement("button");

      dot.type = "button";

      dot.className =
        "perfume-pdf-dot";

      dot.dataset.page = i;

      dot.setAttribute(
        "aria-label",
        "Go to perfume page " + i
      );

      dot.addEventListener(
        "click",
        function () {
          currentPage = i;

          scrollToPage(i);
        }
      );

      dotsContainer.appendChild(dot);
    }

    updateDots();
  }

  /*
   * ============================================================
   * UPDATE DOTS
   * ============================================================
   */

  function updateDots() {
    if (!dotsContainer) {
      return;
    }

    const dots =
      dotsContainer.querySelectorAll(
        ".perfume-pdf-dot"
      );

    dots.forEach(function (dot) {
      const page =
        Number(dot.dataset.page);

      dot.classList.toggle(
        "active",
        page === currentPage
      );
    });
  }

  /*
   * ============================================================
   * KEYBOARD NAVIGATION
   * ============================================================
   */

  function handleKeyboard(event) {
    /*
     * Don't hijack arrow keys when user is typing.
     */
    const tag =
      document.activeElement
        ?.tagName;

    if (
      tag === "INPUT" ||
      tag === "TEXTAREA" ||
      tag === "SELECT"
    ) {
      return;
    }

    if (
      event.key === "ArrowRight"
    ) {
      event.preventDefault();

      goNext();
    }

    if (
      event.key === "ArrowLeft"
    ) {
      event.preventDefault();

      goPrevious();
    }
  }

  /*
   * ============================================================
   * TOUCH / SWIPE
   * ============================================================
   */

  function setupTouchNavigation() {
    if (!pdfWindow) {
      return;
    }

    let touchStartX = 0;
    let touchStartY = 0;

    pdfWindow.addEventListener(
      "touchstart",
      function (event) {
        const touch =
          event.changedTouches[0];

        touchStartX =
          touch.screenX;

        touchStartY =
          touch.screenY;
      },
      {
        passive: true,
      }
    );

    pdfWindow.addEventListener(
      "touchend",
      function (event) {
        const touch =
          event.changedTouches[0];

        const touchEndX =
          touch.screenX;

        const touchEndY =
          touch.screenY;

        const distanceX =
          touchEndX -
          touchStartX;

        const distanceY =
          touchEndY -
          touchStartY;

        /*
         * Ignore vertical scrolling
         */
        if (
          Math.abs(distanceY) >
          Math.abs(distanceX)
        ) {
          return;
        }

        /*
         * Ignore tiny movements
         */
        if (
          Math.abs(distanceX) <
          50
        ) {
          return;
        }

        /*
         * Swipe LEFT
         *
         * Next page
         */
        if (distanceX < 0) {
          goNext();
        }

        /*
         * Swipe RIGHT
         *
         * Previous page
         */
        if (distanceX > 0) {
          goPrevious();
        }
      },
      {
        passive: true,
      }
    );
  }

  /*
   * ============================================================
   * DETECT MANUAL SCROLL
   * ============================================================
   *
   * If the user drags the horizontal scrollbar/swipes,
   * update the counter and active dot.
   */

  let scrollTimer = null;

  if (pdfWindow) {
    pdfWindow.addEventListener(
      "scroll",
      function () {
        clearTimeout(
          scrollTimer
        );

        scrollTimer =
          setTimeout(
            function () {
              if (!pdfWindow) {
                return;
              }

              const pageWidth =
                pdfWindow.clientWidth;

              if (!pageWidth) {
                return;
              }

              const pageIndex =
                Math.round(
                  pdfWindow.scrollLeft /
                    pageWidth
                );

              const detectedPage =
                pageIndex + 1;

              if (
                detectedPage >= 1 &&
                detectedPage <=
                  totalPages &&
                detectedPage !==
                  currentPage
              ) {
                currentPage =
                  detectedPage;

                updateCounter();
                updateDots();
                updateButtons();
              }
            },
            80
          );
      },
      {
        passive: true,
      }
    );
  }

  /*
   * ============================================================
   * RESPONSIVE RESIZE
   * ============================================================
   */

  function setupResize() {
    let resizeTimer;

    window.addEventListener(
      "resize",
      function () {
        clearTimeout(
          resizeTimer
        );

        resizeTimer =
          setTimeout(
            async function () {
              if (!pdf) {
                return;
              }

              /*
               * Re-render all pages because
               * viewport width changed.
               */
              await createAllPages();

              /*
               * Return to current page
               */
              if (pdfWindow) {
                pdfWindow.scrollLeft =
                  (currentPage - 1) *
                  pdfWindow.clientWidth;
              }
            },
            300
          );
      }
    );
  }

  /*
   * ============================================================
   * ERROR
   * ============================================================
   */

  function showError(message) {
    if (!track) {
      return;
    }

    track.innerHTML = `
      <div
        class="perfume-pdf-error"
        style="
          width:100vw;
          min-height:500px;
          display:flex;
          align-items:center;
          justify-content:center;
          flex-direction:column;
          text-align:center;
          padding:40px;
          box-sizing:border-box;
          color:#fff;
          background:#0a0a0a;
        "
      >
        <strong
          style="
            color:#fbbf24;
            font-size:20px;
            margin-bottom:12px;
          "
        >
          PDF Viewer Error
        </strong>

        <div
          style="
            color:#fff;
            line-height:1.6;
          "
        >
          ${message}
        </div>
      </div>
    `;
  }
})();
