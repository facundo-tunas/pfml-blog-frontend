import PropTypes from "prop-types";
import styles from "./SmallCard.module.css";

const SmallCardsSkeleton = ({ count = 6 }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className={`${styles.card} ${styles.skeleton}`}>
          <div className={`${styles.cover} ${styles.skeletonCover}`} />
          <p className={`${styles.date} ${styles.skeletonText}`}>
            Placeholder Date
          </p>
          <div>
            <h3 className={`${styles.title} ${styles.skeletonText}`}>
              Placeholder Title
            </h3>
            <p className={`${styles.summary} ${styles.skeletonText}`}>
              Placeholder summary text longer than title
            </p>
          </div>
          <div className={styles.skeletonUser}>User Placeholder</div>
        </div>
      ))}
    </>
  );
};

export default SmallCardsSkeleton;

SmallCardsSkeleton.propTypes = {
  count: PropTypes.number,
};
