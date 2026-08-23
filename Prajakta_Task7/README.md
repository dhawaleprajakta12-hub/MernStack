# Laundry Service Responsive Page
## About

This is a simple Laundry Service landing page made using HTML and CSS.

The page has a navbar and a hero section. The navbar contains a logo, menu links 
and a username. The hero section contains text, a button and an image.

The main purpose of this task was to practice Flexbox and media queries.

## What I Used

- HTML
- CSS
- Flexbox
- Media Queries

## How I Made It Responsive

I first created the desktop layout.

For the hero section, I used:

```css
display: flex;
````

This placed the text section and image section next to each other.

Then I tested the page with a smaller browser width.

At `768px`, I reduced the font sizes, image size and spacing because the desktop 
sizes were taking too much space.

At `480px`, I changed:

```css
flex-direction: column;
```

This placed the text and image one below the other because they were becoming too
narrow when kept side by side.

I also hid the menu links on the smaller screen.

## What I Learned

* How to use `display: flex`
* How `justify-content` and `align-items` work
* How to use media queries
* How to change CSS for different screen sizes
* How to change a flex row into a column
* Why font sizes and spacing need to change on smaller screens

## How to Run

1. Download or clone the project.
2. Open the project folder.
3. Make sure `index.html` and `style.css` are in the same folder.
4. Open `index.html` in a browser.
5. Resize the browser window to check the responsive layout.


