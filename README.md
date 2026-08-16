# PaulYa Website

This is the official website for Oleg Paulya (PaulYa), a unique music initiative that ranges from classical to rock music, offering new interpretations of classical pieces with a rock edge.

Live site: deployed on AWS Lightsail (Bitnami Nginx). Repository: https://github.com/epaulia/paulya_website

## Project Structure

```
index.html                         # single-page site
css/
    style.css                      # all styles, incl. responsive breakpoints
js/
    main.js                        # scroll-to-top + floating "New Album" button
images/
    favicon.png
    paulya-logo.png
    paulya-background-2.png        # hero background
    paulya-abstract.png            # background of the text panels / video sections
    photo_2026-04-07_22-11-10.jpg  # "Project PaulYa" performance photo
    new_album_cover_new.jpg        # "From Classic To Rock" album cover
    new_album_tracklist_new.jpg    # album tracklist (disc sleeve)
    paulya-collage.png             # photo gallery section
.github/workflows/
    deploy.yml                     # auto-deploy to Lightsail on push to main
```

The site is plain HTML/CSS/JS with no build step. Fonts (Playfair Display, Poppins) are loaded from Google Fonts.

## Features

- **Hero Section**: PaulYa logo and the "From Classic To Rock" subtitle over a full-screen background.
- **Project Description Section**: Performance photo and a short description of the project.
- **New Album Section** (`#album-section`): Full cover art of *From Classic To Rock* (2026, 13 tracks), the tracklist on a disc sleeve with a vinyl that slides out on hover, and "Listen Now" links to Spotify, Apple Music, YouTube Music and Amazon Music.
- **Video Sections**: Embedded YouTube performances, grouped as *Official Videos*, *Performance with the Band*, and three galleries of *Performance with Orchestras and the Band*.
- **Photo Gallery Section**: Photo collage with the logo and album title.
- **Footer**: Instagram, YouTube and email links.
- **Floating buttons** (`js/main.js`): a "New Album" disc that appears whenever the album section is out of view and scrolls to it on click, and a scroll-to-top button shown after the hero.

## Local Development

1. Clone the repository:
    ```sh
    git clone https://github.com/epaulia/paulya_website.git
    cd paulya_website
    ```

2. Open `index.html` directly in a browser, or serve the folder (avoids `file://` quirks):
    ```sh
    python -m http.server 8000
    # then open http://localhost:8000
    ```

3. Work on a feature branch and open a pull request against `main`. Merging to `main` deploys the site (see below), so verify changes locally first — the album section and streaming-button layout have breakpoints for large monitors, laptops, tablets and phones.

## Deployment

### Automatic (GitHub Actions)

Every push to `main` runs `.github/workflows/deploy.yml`, which:

1. Uploads `index.html`, `css/*`, `js/*` and `images/*` via SCP to `~/temp` on the Lightsail instance,
2. Copies them into `/opt/bitnami/nginx/html/`, fixes ownership/permissions,
3. Restarts Nginx.

It uses these repository secrets: `LIGHTSAIL_HOST`, `LIGHTSAIL_USER`, `LIGHTSAIL_SSH_KEY`.

Note: the workflow copies files over the existing ones and does not delete files that were removed from the repo.

### Manual (fallback)

Step 1: Prepare the server

```sh
# Create a temporary directory in your home folder
mkdir -p ~/temp

# Set permissions for the web directory
sudo chown -R bitnami:bitnami /opt/bitnami/nginx/html/
sudo chmod -R 755 /opt/bitnami/nginx/html/
```

Step 2: Upload files (from your local machine)

```sh
# Option 1: Using SCP (run this on your local machine)
scp -i your-key.pem -r /path/to/your/local/website/* bitnami@your-server-ip:~/temp/

# Option 2: Using an SFTP client like FileZilla
# Connect to your server and upload files to ~/temp/
```

Step 3: Move files to the web directory

```sh
# Copy files from temp directory to web directory
sudo cp -r ~/temp/* /opt/bitnami/nginx/html/

# Set proper permissions
sudo chown -R bitnami:bitnami /opt/bitnami/nginx/html/
sudo chmod -R 755 /opt/bitnami/nginx/html/
```

Step 4: Restart Nginx

```sh
sudo /opt/bitnami/ctlscript.sh restart nginx
# Verify Nginx is running
sudo /opt/bitnami/ctlscript.sh status nginx
```
