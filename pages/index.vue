<template>
  <div>
    <div class="mocked-paragraphs-container">
      <p v-for="paragraph in mockedParagraphs" :key="paragraph.id" :data-id="paragraph.id" class="paragraph" v-html="paragraph.content"></p>
    </div>
    <div v-show="showLinkMenu" class='link-menu' @click="createLink">
      🔗
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      mockedParagraphs: [],
      showLinkMenu: false,
      lastSelectionText: null,
      lastSelectionElement: null,
      lastSelectionBaseOffset: null,
      lastSelectionExtentOffset: null,
    };
  },
  async mounted() {
    await this.fetchData();
    this.scrollToElementById();
    document.addEventListener('mouseup', event => {
      if (event.target.classList.contains('paragraph')) {
        this.showLinkMenu = true;
        document.querySelector('.link-menu').style.transform = `translate3d(${event.clientX - 40}px, ${event.clientY - 50}px, 0px)`;
        const selection = window.getSelection();
        this.lastSelectionText = selection.toString().trim();
        this.lastSelectionElement = selection.baseNode;
        this.lastSelectionBaseOffset = selection.baseOffset;
        this.lastSelectionExtentOffset = selection.extentOffset;
      }
    });
  },
  methods: {
    // I know that it's better to create some apiService and use it instead of sending requests from the component
    // Just wanted to make working thing faster
    // Of course the code should be improved/refactored
    async createLink() {
      const selectedText = this.lastSelectionText;
      const linkId = (new Date()).getTime();
      // I'm creating id on a frontend, of course it can be done on a backend if needed
      const linkedText = `<span id="${linkId}">${selectedText}</span>`;
      if (selectedText) {
        const selectedElement = this.lastSelectionElement;
        const pId = this.lastSelectionElement.parentElement.dataset.id;
        let text = selectedElement.textContent;
        text = text.slice(0, this.lastSelectionBaseOffset) + linkedText + text.slice(this.lastSelectionExtentOffset);
        // did just simple backend update for simplicity
        // can be a different approach to handle it on frontend like this if backend request was success:
        // selectedElement.parentElement.innerHTML = selectedElement.parentElement.innerHTML.replace(selectedElement.textContent, text);
        await this.saveUpdatedParagraph(pId, text);
        if (window.confirm('Link Created! If you click "ok" you would be redirected to test the new link'))
        {
          window.location.href=`/?id=${linkId}`;
        };
      }
      this.showLinkMenu = false;
    },
    async fetchData () {
      try {
        const response = await fetch('/api/data')
        const data = await response.json();
        this.mockedParagraphs = data.mockedParagraphs;
      } catch (err) {
        console.log(err)
      }

    },
    async saveUpdatedParagraph (id, content) {
      try {
        const response = await fetch('/api/updateParagraph', {
          method: 'POST',
          mode: 'cors',
          cache: 'no-cache',
          credentials: 'same-origin',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id, content })
        });
        const data = await response.json();
        this.mockedParagraphs = data.mockedParagraphs;
      } catch (err) {
        console.log(err)
      }

    },
    scrollToElementById() {
      if (this.$route.query.id) {
        const element = document.getElementById(this.$route.query.id);
        if (element) {
          // can be refactored by just using class
          element.style.fontWeight = 'bold';
          element.style.backgroundColor = 'yellow';
          element.scrollIntoView();
        }
      }
    }
  }
}
</script>

<style lang="css" scoped>
  .mocked-paragraphs-container {
    margin: 3rem;
    font-size: 1.4rem;
    line-height: 30px;
  }
  .link-menu {
    position: absolute;
    top: 0;
    left: 0;
    cursor: pointer;
    width: 40px;
    vertical-align: middle;
    padding: 0.2rem;
    font-size: 20px;
    text-align: center;
    background-color: black;
    border-radius: 10%;
  }
</style>
