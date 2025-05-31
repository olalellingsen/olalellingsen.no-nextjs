function SpotifyPlayer({ link, height }: { link: string; height?: number }) {
  return (
    <div>
      <iframe
        src={link}
        width="100%"
        height={height || 380}
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      ></iframe>
    </div>
  );
}

export default SpotifyPlayer;
