---
title:        Resources
permalink:    SpringNotes/Resources
category:     SpringNotes
parent:       SpringNotes
layout:       default
has_children: false        
---


<br/>          

<details markdown="block">                
<summary>                
Table of contents                
</summary>                
{: .text-delta }                
1. TOC                
{:toc}                
</details>                

<br/>                

***                

<br/>

# Using Files In Resources

- ## ClassPathResource
  ```java
    import org.springframework.core.io.ClassPathResource;
    import org.springframework.core.io.Resource;
    import static org.assertj.core.api.Assertions.assertThat;
    
    private void loadTrackSummaryResult() throws IOException {
        Resource resource = new ClassPathResource(TRACK_SUMMARY_RESULTS_MOCK_PATH);
        try (InputStream is = resource.getInputStream()) {
            assertThat(is).isNotNull();
            trackSummaryResults = objectMapper.readValue(is, TrackSummaryResults.class);
        }
    }
  ```

- ##  Injecting a Resource using `@Value`
  ```java
    import org.springframework.beans.factory.annotation.Value;
    import org.springframework.core.io.Resource;
    import org.junit.jupiter.api.Test;
    import static org.assertj.core.api.Assertions.assertThat;
    
    public class TrackSummarySinkTest {
    
        @Value("classpath:your/path/to/track_summary_results_mock.json")
        private Resource trackSummaryResultsResource;
    
        @Test
        public void testLoadTrackSummaryResult() throws IOException {
            assertThat(trackSummaryResultsResource.exists()).isTrue();
            try (InputStream is = trackSummaryResultsResource.getInputStream()) {
                trackSummaryResults = objectMapper.readValue(is, TrackSummaryResults.class);
                // Make assertions on trackSummaryResults as needed
            }
        }
    }
  ```

- ## Using ResourceLoader
  ```java
    import org.springframework.core.io.Resource;
    import org.springframework.core.io.ResourceLoader;
    import org.junit.jupiter.api.Test;
    import org.springframework.beans.factory.annotation.Autowired;
    import static org.assertj.core.api.Assertions.assertThat;
    
    public class TrackSummarySinkTest {
    
        @Autowired
        private ResourceLoader resourceLoader;
    
        @Test
        public void testLoadTrackSummaryResultWithResourceLoader() throws IOException {
            Resource resource = resourceLoader.getResource("classpath:your/path/to/track_summary_results_mock.json");
            assertThat(resource.exists()).isTrue();
            try (InputStream is = resource.getInputStream()) {
                trackSummaryResults = objectMapper.readValue(is, TrackSummaryResults.class);
                // assertions on trackSummaryResults
            }
        }
    }
  ```
