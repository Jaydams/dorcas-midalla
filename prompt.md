

Create a React component for a beautiful, smooth birthday slideshow using Framer Motion. The slideshow will display photos of a birthday celebrant, including solo portraits and family photos.

**Core Requirements:**

1. **Image Display**: Support for multiple images (at least 8-12 photos) that cycle through automatically
2. **Smooth Transitions**: Use Framer Motion's animation capabilities for elegant fade, slide, or scale transitions between images
3. **Auto-play**: Auto-advance every 4-5 seconds
4. **Progress Indicators**: Add elegant dots or a progress bar to show which image is currently displayed
5. **Responsive Design**: Ensure images look great on all screen sizes while maintaining aspect ratio

**Visual Design Elements:**

1. **Elegant Typography**: Include the celebrant's name and age/birthday message that animates in beautifully
2. **Sophisticated Color Scheme**: Use a warm, celebratory palette (golds, soft pinks, elegant blacks/whites) or allow customization
3. **Subtle Decorative Elements**: Optional confetti, sparkles, or birthday-themed accent animations that don't overpower the photos
4. **Image Treatment**: Consider adding subtle overlays, frames, or vignettes to give photos a polished look
5. **Background**: Elegant gradient or pattern that complements the photos

**Animation Styles to Consider:**

- **Crossfade**: Classic, elegant fade between images
- **Ken Burns Effect**: Subtle zoom and pan on images while they're displayed
- **Slide & Fade**: Images slide in from the side while fading
- **3D Flip/Rotation**: More dynamic card-flip style transition
- **Scale & Blur**: Current image scales down and blurs while next scales up
- **Parallax Layers**: Multi-layer effect with text and images moving at different speeds

**Advanced Features:**

1. **Thumbnail Preview**: Small thumbnails at bottom for quick navigation
2. **Fullscreen Mode**: Option to view in fullscreen
3. **Touch/Swipe Support**: Swipe gestures for mobile devices
4. **Keyboard Navigation**: Arrow keys for previous/next

**Technical Specifications:**

- Use Framer Motion's `motion` components and `AnimatePresence` for enter/exit animations
- Implement proper image preloading to prevent loading delays
- Use `variants` for coordinated animations between multiple elements
- Optimize performance with lazy loading for images not yet viewed
- Add proper accessibility (ARIA labels, keyboard navigation)

**User Experience:**

- Smooth 60fps animations
- No jarring transitions or sudden movements
- Elegant loading state while images are being fetched
- Clear, intuitive controls that don't distract from the photos
- Option to restart slideshow from beginning

**Styling Preferences:**

- Modern, clean aesthetic that feels celebratory but sophisticated
- Use Tailwind CSS for styling
- Ensure text is always readable over images (use overlays/shadows as needed)
- Mobile-first responsive design

**Example Animation Sequence:**

When a new image enters: fade in from opacity 0 to 1, scale from 0.95 to 1, over 0.6 seconds with an ease-out curve. When text appears: slide up from below with fade, staggered by 0.1 seconds per line.

**Bonus Features:**

- Confetti burst animation on first load
- Subtle particle effects that float across the screen
- Polaroid-style or ornate frame effects around photos

Create this as a self-contained, customizable component where images, name, and styling can be easily configured through props or a simple configuration object.

The name of the Celebrant is Dorcas Midalla and she is celebrating her 50th Birthday.
---
