export default function footnotes(main) {
    const footnotes = this.util.addElement('footnotes', main, 'small');
    footnotes.html(this.settings.footnotes.join('<br>'));

    return footnotes;
}
