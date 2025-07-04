import { useEffect, useState } from "react";
import axios from "axios";

interface Category {
  slug: string;
  name: string;
  url: string;
}

let categoriesCache: Category[] | null = null;
let lastFetchTime: number | null = null;
let isFetching = false;

export const useFetchCategories = (staleTime = 60000) => {
  const [categories, setCategories] = useState<Category[]>(
    categoriesCache || []
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await axios.get(
          "https://dummyjson.com/products/categories"
        );

        let rawData = response.data;

        if (!Array.isArray(rawData)) {
          if (rawData.categories && Array.isArray(rawData.categories)) {
            rawData = rawData.categories;
          } else if (rawData.data && Array.isArray(rawData.data)) {
            rawData = rawData.data;
          } else {
            throw new Error("Invalid API response format");
          }
        }

        const categoriesData: Category[] = rawData.map((item: any) => {
          if (typeof item === "object" && item.slug && item.name) {
            return {
              slug: item.slug,
              name: item.name,
              url: item.url || `/category/${item.slug}`,
            };
          }

          const slug = String(item);
          return {
            slug,
            name: slug
              .split("-")
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(" "),
            url: `/category/${slug}`,
          };
        });

        categoriesCache = categoriesData;
        lastFetchTime = Date.now();
        setCategories(categoriesData);
      } catch (err) {
        const error =
          err instanceof Error ? err : new Error("Failed to fetch categories");
        setError(error);
        console.error("Failed to fetch categories:", error);
      } finally {
        setIsLoading(false);
        isFetching = false;
      }
    };

    const now = Date.now();
    const isCacheValid =
      categoriesCache && lastFetchTime && now - lastFetchTime < staleTime;

    if (isCacheValid) {
      return;
    }

    if (isFetching) {
      return;
    }

    isFetching = true;
    fetchData();
  }, [staleTime]);

  return { categories, isLoading, error };
};
