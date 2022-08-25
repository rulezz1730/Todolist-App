
describe('addItemForm', () => {
    it('base example, visually looks correct', async () => {
        // APIs from jest-puppeteer
        await page.goto('http://localhost:9009/iframe.html?id=todolist-add-item-form-story--add-item-form-story&viewMode=story')
        const image = await page.screenshot()

        // API from jest-image-snapshot
        expect(image).toMatchImageSnapshot()
    })
})

describe('EditableSpan', () => {
    it('base example, visually looks correct', async () => {
        // APIs from jest-puppeteer
        await page.goto('http://localhost:9009/iframe.html?args=title:Title213213&id=todolist-editablespan-component-story--editable-span-story&viewMode=story')
        const image = await page.screenshot()

        // API from jest-image-snapshot
        expect(image).toMatchImageSnapshot()
    })
})